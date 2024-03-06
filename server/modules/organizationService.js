const pool = require("./pool");
const axios = require("axios");

const postOrganizationWithDetails = async (organizationDetails) => {
    const {
        addressLineOne,
        addressLineTwo,
        city,
        state,
        stateAbbreviation,
        zipCode,
    } = organizationDetails.address;

    const {
        name,
        serviceExplanation,
        logo,
        mission,
        notes,
        url,
        phone,
        email,
        forProfit,
        faithBased,
        hasRetreatCenter,
        linkedInUrl,
        facebookUrl,
        instagramUrl,
    } = organizationDetails.org;

    // arrays of strings
    const lossTypeIds = organizationDetails.lossTypes;
    const serviceTypesIds = organizationDetails.serviceTypes;

    // array of objects
    const contacts = organizationDetails.contacts;

    // define DB connection, and ids from created entities
    let connection;
    let addressId;
    let organizationId;

    try {
        // convert city and state to latitude and longitude
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
        // console.log("latitude:", latitude);
        // console.log("longitude:", longitude);

        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        connection.query("BEGIN;");

        // INSERT address
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
            addressLineOne,
            addressLineTwo,
            city,
            stateAbbreviation,
            zipCode,
            latitude,
            longitude,
        ]);

        addressId = addressQueryRes.rows[0].id;

        // console.log("addressId:", addressId);

        // INSERT organization
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
            name,
            serviceExplanation,
            logo,
            mission,
            notes,
            url,
            phone,
            email,
            forProfit,
            faithBased,
            hasRetreatCenter,
            linkedInUrl,
            facebookUrl,
            instagramUrl,
            addressId,
        ]);

        organizationId = organizationQueryRes.rows[0].id;
        // console.log("organizationId", organizationId);

        const serviceParameterQueryString = serviceTypesIds
            .map((id, i) => {
                // make two query parameter placeholders per loop
                return `($${i * 2 + 1}, $${i * 2 + 2})`;
            })
            .join(", ");

        // format for multi-line SQL insert
        serviceQueryParams = serviceTypesIds.flatMap((id) => [
            organizationId,
            id,
        ]);
        // console.log("serviceQueryParams:", serviceQueryParams);

        const serviceTypeQuery = `INSERT INTO "service_type_by_organization"
                                        (
                                            "organization_id",
                                            "service_id"
                                            ) VALUES ${serviceParameterQueryString};`;

        // INSERT service_type_by_organization(s)
        const serviceTypeQueryResponse = await connection.query(
            serviceTypeQuery,
            serviceQueryParams
        );
        // console.log("serviceTypeQueryResponse.rows:", serviceTypeQueryResponse.rows);

        // INSERT loss_type_by_organization(s)
        const lossParameterQueryString = lossTypeIds
            .map((lossType, i) => {
                // make two query parameter placeholders per loop
                return `($${i * 2 + 1}, $${i * 2 + 2})`;
            })
            .join(", ");

        // format for multi-line SQL insert
        lossQueryParams = lossTypeIds.flatMap((id) => [organizationId, id]);

        const lossTypeQuery = `INSERT INTO "loss_type_by_organization"
                                    (
                                        "organization_id",
                                        "loss_id"
                                        ) VALUES ${serviceParameterQueryString};`;

        // INSERT loss_type_by_organization(s)
        const lossTypeQueryResponse = await connection.query(
            lossTypeQuery,
            lossQueryParams
        );

        // LOOP through contacts:
        // INSERT organization_contact
        const contactParameterQueryString = contacts
            .map((contact, i) => {
                // make six query parameter placeholders per loop
                return `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${
                    i * 6 + 4
                }, $${i * 6 + 5}, $${i * 6 + 6})`;
            })
            .join(", ");

        console.log("contactParameterQueryString:", contactParameterQueryString);

        // format for multi-line SQL insert
        contactQueryParams = contacts.flatMap((contact) => [
            contact.firstName,
            contact.lastName,
            contact.phone,
            contact.email,
            contact.title,
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
                ) VALUES ${contactParameterQueryString};`;

        const contactQueryResponse = await connection.query(
            contactQuery,
            contactQueryParams
        );

        connection.query("COMMIT;");
    } catch (err) {
        connection.query("ROLLBACK;");
        throw err; // feed error up to route handler
    } finally {
        connection.release();
    }
};

module.exports = postOrganizationWithDetails;
