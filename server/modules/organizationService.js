const pool = require("./pool");
const axios = require("axios");

const postOrganizationWithDetails = async (organizationDetails, user) => {
    const { city, state } = organizationDetails.address;

    try {
       const geojson = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${city}%2C+${state}&format=geojson`,
            {
                headers: {
                    "User-Agent": "Faiths Resource Network 0.0.1",
                },
            }
        );
        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        connection.query("BEGIN;");

        // INSERT address
        // INSERT organization
        // LOOP through serviceTypes:
        // INSERT service_type_by_organization
        // LOOP through lossTypes:
        // INSERT loss_type_by_organization
        // LOOP through contacts:
        // INSERT organization_contact
    } catch (err) {
        connection.query("ROLLBACK;");
        throw err; // feed error up to route handler
    } finally {
        connection.release();
    }
};

module.exports = postOrganizationWithDetails;
