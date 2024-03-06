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

async function convertCityStateToLatLong(city, state) {
    const geojson = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}%2C+${state}&format=geojson`,
        {
            headers: {
                "User-Agent": process.env.USER_AGENT,
            },
        }
    );

    const latitude = geojson.data.features[0].geometry.coordinates[0];
    const longitude = geojson.data.features[0].geometry.coordinates[1];
    return { latitude, longitude };
}

async function postAddress(connection, address) {
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
    const addressQueryRes = await connection.query(addressQuery, [
        address.addressLineOne,
        address.addressLineTwo,
        address.city,
        address.stateAbbreviation,
        address.zipCode,
        address.latitude,
        address.longitude,
    ]);

    return addressQueryRes.rows[0].id;
}

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

    const organizationQueryRes = await connection.query(organizationQuery, [
        organization.name,
        organization.serviceExplanation,
        organization.logo,
        organization.mission,
        organization.notes,
        organization.url,
        organization.phone,
        organization.email,
        organization.forProfit,
        organization.faithBased,
        organization.hasRetreatCenter,
        organization.linkedInUrl,
        organization.facebookUrl,
        organization.instagramUrl,
        organization.addressId,
    ]);

    return organizationQueryRes.rows[0].id;
}

async function postServiceTypeByOrganization(
    serviceTypesIds,
    organizationId,
    connection
) {
    // generate $1, $2, ... for SQL query string
    const serviceParameterQueryString = serviceTypesIds
        .map((id, i) => {
            // make two query parameter placeholders per loop
            return `($${i * 2 + 1}, $${i * 2 + 2})`;
        })
        .join(", ");

    // format values for multi-line SQL insert
    serviceQueryParams = serviceTypesIds.flatMap((id) => [organizationId, id]);
    if (serviceTypesIds.length > 0) {
        const serviceTypeQuery = `INSERT INTO "service_type_by_organization"
                                        (
                                            "organization_id",
                                            "service_id"
                                            ) VALUES ${serviceParameterQueryString};`;

        // INSERT service_type_by_organization(s)
        await connection.query(serviceTypeQuery, serviceQueryParams);
    }
}

async function postLossTypeByOrganization(
    lossTypeIds,
    organizationId,
    connection
) {
    const lossParameterQueryString = lossTypeIds
        .map((lossType, i) => {
            // make two query parameter placeholders per loop
            return `($${i * 2 + 1}, $${i * 2 + 2})`;
        })
        .join(", ");

    // format for multi-line SQL insert
    lossQueryParams = lossTypeIds.flatMap((id) => [organizationId, id]);

    if (lossTypeIds.length > 0) {
        const lossTypeQuery = `INSERT INTO "loss_type_by_organization"
                                    (
                                        "organization_id",
                                        "loss_id"
                                        ) VALUES ${lossParameterQueryString};`;

        // INSERT loss_type_by_organization(s)
        await connection.query(lossTypeQuery, lossQueryParams);
    }
}

async function postContacts(contacts, organizationId, connection) {
    const contactParameterQueryString = contacts
        .map((contact, i) => {
            // make six query parameter placeholders per loop
            return `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${
                i * 6 + 4
            }, $${i * 6 + 5}, $${i * 6 + 6})`;
        })
        .join(", ");

    // format for multi-line SQL insert
    contactQueryParams = contacts.flatMap((contact) => [
        contact.firstName,
        contact.lastName,
        contact.phone,
        contact.email,
        contact.title,
        organizationId,
    ]);

    if (contacts.length > 0) {
        const contactQuery = `INSERT INTO "organization_contact"
            (
                "first_name",
                "last_name",
                "phone",
                "email",
                "title",
                "organization_id"
                ) VALUES ${contactParameterQueryString};`;

        await connection.query(contactQuery, contactQueryParams);
    }
}

module.exports = postOrganizationWithDetails;
