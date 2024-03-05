const pool = require("./pool");
const axios = require("axios");

const postOrganizationWithDetails = async (organizationDetails, user) => {
    console.log("user obj:", user);
    
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
    const lossTypes = organizationDetails.lossTypes;
    const serviceTypes = organizationDetails.serviceTypes;

    // array of objects
    const contacts = organizationDetails.contacts;

    // define DB connection
    let connection;

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

        const addressId = addressQueryRes.rows[0].id;

        console.log("addressId:", addressId);
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
                                            "address_id",
                                            "verified_by"
                                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;

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
            user.id
        ]);

        console.log("added org, res:", organizationQueryRes);
        // LOOP through serviceTypes:
        // INSERT service_type_by_organization
        // LOOP through lossTypes:
        // INSERT loss_type_by_organization
        // LOOP through contacts:
        // INSERT organization_contact

        connection.query("COMMIT;");
    } catch (err) {
        connection.query("ROLLBACK;");
        throw err; // feed error up to route handler
    } finally {
        connection.release();
    }
};

module.exports = postOrganizationWithDetails;
