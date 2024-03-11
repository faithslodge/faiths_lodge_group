const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
    ORG_GET_QUERY,
    postContacts,
    postAddress,
    postLossTypeByOrganization,
    postServiceTypeByOrganization,
    postOrganization,
    convertCityStateToLatLong,
} = require("../modules/routerService");

/**
 * GET all organizations
 */
router.get("/", rejectUnauthenticated, async (req, res) => {
    try {
        const dbRes = await pool.query(ORG_GET_QUERY);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error(
            "[inside organization.router GET all orgs] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * POST make new organization
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
    const { organizationDetails } = req.body;
    
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
        res.sendStatus(201);
    } catch (err) {
        connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router POST new org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

/**
 * PUT edit organization
 */
router.put("/:id", rejectUnauthenticated, async (req, res) => {
    const { organizationId } = req.params;
    const { organizationDetails } = req.body;
    try {
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside organization.router PUT edit org] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * DELETE organization
 */
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
    const organizationId = req.params.id;
    let connection;
    try {
        connection = await pool.connect();

        // Begin transaction
        connection.query("BEGIN;");

        const organizationDelQuery = `DELETE FROM organization
    WHERE organization.id = $1 RETURNING organization.address_id;`;

        // delete organization
        const organizationDelResponse = await connection.query(
            organizationDelQuery,
            [organizationId]
        );

        const addressId = organizationDelResponse.rows[0].address_id;

        // then delete address
        const addressDelQuery = `DELETE FROM address
                                WHERE address.id = $1;`;

        const addressDelResponse = await connection.query(addressDelQuery, [
            addressId,
        ]);

        // Commit transaction
        connection.query("COMMIT;");
        res.sendStatus(204);
    } catch (err) {
        // Cancel transaction
        connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router PUT edit org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

module.exports = router;
