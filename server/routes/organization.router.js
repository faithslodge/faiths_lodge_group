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
    putOrganization,
    putAddress,
    deleteLossTypeAssociations,
    deleteServiceTypeAssociations,
    putContacts,
    deleteContactsOmittedFromOrgUpdate,
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
    const { org, address, lossTypes, serviceTypes, contacts } =
        req.body.organizationDetails;
    const { city, state } = address;

    // define DB connection, and ids from created entities
    let connection;
    let addressId;
    let organizationId;

    try {
        const { latitude, longitude } = await convertCityStateToLatLong(
            city,
            state
        );

        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        await connection.query("BEGIN;");

        // INSERT address
        addressId = await postAddress(connection, {
            ...address,
            latitude,
            longitude,
        });

        // INSERT organization
        organizationId = await postOrganization(connection, {
            ...org,
            addressId,
        });

        // INSERT service types of organization
        await postServiceTypeByOrganization(
            serviceTypes,
            organizationId,
            connection
        );

        // INSERT loss types of organization
        await postLossTypeByOrganization(lossTypes, organizationId, connection);

        // INSERT organization_contact
        await postContacts(contacts, organizationId, connection);

        await connection.query("COMMIT;");
        res.sendStatus(201);
    } catch (err) {
        await connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router POST new org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        await connection.release();
    }
});

/**
 * PUT edit organization
 */
router.put("/:organizationId", rejectUnauthenticated, async (req, res) => {
    const { organizationId } = req.params;
    const { address, lossTypes, serviceTypes, contacts, org } =
        req.body.updateOrg;

    // define DB connection
    let connection;

    // Grab newly generated contacts to add to this organization
    const newContacts = contacts.filter((contact) => !contact.id);

    // Grab contacts to edit
    const editContacts = contacts.filter((contact) => contact.id);

    try {
        const { latitude, longitude } = await convertCityStateToLatLong(
            address.city,
            address.state
        );

        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        await connection.query("BEGIN;");

        let addressId = await putOrganization(connection, {
            ...org,
            organizationId,
        });

        await putAddress(connection, {
            ...address,
            latitude,
            longitude,
            addressId,
        });

        // DELETE CURRENT LOSS TYPE ASSOCIATIONS
        await deleteLossTypeAssociations(connection, organizationId);
        // POST GIVEN LOSS TYPE ASSOCIATIONS
        await postLossTypeByOrganization(lossTypes, organizationId, connection);

        // DELETE CURRENT SERVICE TYPE ASSOCIATIONS
        await deleteServiceTypeAssociations(connection, organizationId);
        // POST GIVEN SERVICE TYPE ASSOCIATIONS
        await postServiceTypeByOrganization(
            serviceTypes,
            organizationId,
            connection
        );

        // DELETE MISSING CONTACTS
        const contactGetText = `SELECT * FROM "organization_contact" WHERE "organization_id" = $1;`;
        const getContactsInOrgResult = await connection.query(contactGetText, [
            organizationId,
        ]);
        const currentContactsInOrg = getContactsInOrgResult.rows;

        const currentContactsInOrgIds = currentContactsInOrg.map(
            (contact) => contact.id
        );
        const editContactsIds = editContacts.map((contact) => contact.id);
        contactIdsToDelete = editContactsIds.filter(
            (id) => !currentContactsInOrgIds.includes(id)
        );
        await deleteContactsOmittedFromOrgUpdate(
            connection,
            organizationId,
            contactIdsToDelete
        );

        // EDIT THE CONTACTS BY ID
        await putContacts(editContacts, organizationId, connection);
        // ADD NEW CONTACTS
        await postContacts(newContacts, organizationId, connection);

        await connection.query("COMMIT;");
        res.sendStatus(204);
    } catch (err) {
        // Cancel transaction
        await connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router PUT edit org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        await connection.release();
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
