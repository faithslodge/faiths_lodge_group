const pool = require("./pool");
const axios = require("axios");

const postOrganizationWithDetails = async (organizationDetails) => {
    // define DB connection, and ids from created entities
    let connection;
    let addressId;
    let organizationId;

    const { city, state } = organizationDetails.address;
    const lossTypeIds = organizationDetails.lossTypes;
    const serviceTypesIds = organizationDetails.serviceTypes;
    const contacts = organizationDetails.contacts;

    try {
        const { latitude, longitude } = await convertCityStateToLatLong(
            city,
            state
        );

        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        connection.query("BEGIN;");

        // INSERT address
        addressId = await postAddress(connection, {
            ...organizationDetails.address,
            latitude,
            longitude,
        });

        // INSERT organization
        organizationId = await postOrganization(connection, {
            ...organizationDetails.org,
            addressId,
        });

        // INSERT service types of organization
        await postServiceTypeByOrganization(
            serviceTypesIds,
            organizationId,
            connection
        );

        // INSERT loss types of organization
        await postLossTypeByOrganization(
            lossTypeIds,
            organizationId,
            connection
        );

        // INSERT organization_contact
        await postContacts(contacts, organizationId, connection);

        connection.query("COMMIT;");
    } catch (err) {
        connection.query("ROLLBACK;");
        throw err; // feed error up to route handler
    } finally {
        connection.release();
    }
};

// translate a city/state to a lat/long to store in DB for this org
async function convertCityStateToLatLong(city, state) {
    const geojson = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}%2C+${state}&format=geojson`,
        {
            headers: {
                "User-Agent": process.env.USER_AGENT,
            },
        }
    );

    const latitude = geojson.data.features[0].geometry.coordinates[1];
    const longitude = geojson.data.features[0].geometry.coordinates[0];
    return { latitude, longitude };
}

// INSERT an address into DB for this organization
async function postAddress(connection, address) {
    const addressEntityForDatabase = { ...address };

    // remove the full state name before storing in database
    delete addressEntityForDatabase.state;

    const addressQuery = `INSERT INTO "address"
                                    (
                                        "address_line_1",
                                        "address_line_2",
                                        "city",
                                        "state",
                                        "zip_code",
                                        "latitude",
                                        "longitude"
                                        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
    const addressQueryRes = await connection.query(
        addressQuery,
        Object.values(addressEntityForDatabase)
    );

    return addressQueryRes.rows[0].id;
}

// INSERT an organization into DB
async function postOrganization(connection, organization) {
    const organizationQuery = `INSERT INTO "organization"
                                    (
                                        "name",
                                        "service_explanation",
                                        "logo",
                                        "mission",
                                        "notes",
                                        "url",
                                        "phone",
                                        "email",
                                        "for_profit",
                                        "faith_based",
                                        "has_retreat_center",
                                        "linked_in_url",
                                        "facebook_url",
                                        "instagram_url",
                                        "address_id"
                                    ) VALUES (
                                        $1, $2, $3, $4, $5, $6, $7, $8, $9,
                                        $10, $11, $12, $13, $14, $15
                                        ) RETURNING id;`;

    const organizationQueryRes = await connection.query(
        organizationQuery,
        Object.values(organization)
    );

    return organizationQueryRes.rows[0].id;
}

// INSERT a service type for this org in DB
async function postServiceTypeByOrganization(
    serviceTypesIds,
    organizationId,
    connection
) {
    if (serviceTypesIds && serviceTypesIds.length > 0) {
        const mappedServiceTypesToOrg = serviceTypesIds.map((serviceTypeId) => {
            return { organizationId, serviceTypeId };
        });

        const serviceTypeInputCount = generateNumberOfQueryInputs(
            mappedServiceTypesToOrg
        );

        // format values for multi-line SQL insert
        serviceQueryParams = mappedServiceTypesToOrg.flatMap(
            (orgWithLossType) => Object.values(orgWithLossType)
        );
        const serviceTypeQuery = `INSERT INTO "service_type_by_organization"
                                        (
                                            "organization_id",
                                            "service_id"
                                            ) VALUES ${serviceTypeInputCount};`;

        // INSERT service_type_by_organization(s)
        await connection.query(serviceTypeQuery, serviceQueryParams);
    }
}

// INSERT a loss type association for this org in DB
async function postLossTypeByOrganization(
    lossTypeIds,
    organizationId,
    connection
) {
    if (lossTypeIds && lossTypeIds.length > 0) {
        // associate the org id with this loss type
        const mappedLossTypesToOrg = lossTypeIds.map((lossTypeId) => {
            return { organizationId, lossTypeId };
        });
        const lossTypeInputCount =
            generateNumberOfQueryInputs(mappedLossTypesToOrg);

        // format for arg array for multi-line SQL insert
        lossQueryParams = mappedLossTypesToOrg.flatMap((orgWithType) =>
            Object.values(orgWithType)
        );

        const lossTypeQuery = `INSERT INTO "loss_type_by_organization"
                                    (
                                        "organization_id",
                                        "loss_id"
                                        ) VALUES ${lossTypeInputCount};`;

        // INSERT loss_type_by_organization(s)
        await connection.query(lossTypeQuery, lossQueryParams);
    }
}

// INSERT contact into DB for this org
async function postContacts(contacts, organizationId, connection) {
    if (contacts && contacts.length > 0) {
        const contactsWithOrg = contacts.map((contact) => {
            return { ...contact, organizationId };
        });
        const contactInputCount = generateNumberOfQueryInputs(contactsWithOrg);

        // format for multi-line SQL insert
        contactQueryParams = contacts.flatMap((contact) => [
            ...Object.values(contact),
            organizationId,
        ]);

        const contactQuery = `INSERT INTO "organization_contact"
            (
                "first_name",
                "last_name",
                "phone",
                "email",
                "title",
                "organization_id"
                ) VALUES ${contactInputCount};`;

        await connection.query(contactQuery, contactQueryParams);
    }
}

// This function generates the parameter input count string for an SQL
// query for an array of objects. It maps through the array and counts
// the properties of the objs in the array in sequence for all elements
// of the array.
function generateNumberOfQueryInputs(arrayOfObjs) {
    const numPropertiesInObj = Object.keys(arrayOfObjs[0]).length;
    const propertiesInObj = Object.keys(arrayOfObjs[0]);

    // make the multi-line insert parameter input placeholders
    return arrayOfObjs
        .map((obj, i) => {
            // make one line of placeholders for multi-line SQL INSERT
            const array = propertiesInObj.map((value, j) => {
                return `$${i * numPropertiesInObj + (j + 1)}`;
            });
            return "(" + array.join(", ") + ")";
        })
        .join(", ");
}

module.exports = postOrganizationWithDetails;
