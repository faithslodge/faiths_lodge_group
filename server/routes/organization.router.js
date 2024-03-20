const express = require("express");
const pool = require("../modules/pool");
const fs = require("fs");
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
    getContactIdsToDeleteFromOrg,
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
    const { org, address, lossTypes, serviceTypes, contacts, logoId } =
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
            logoId: logoId,
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

        // COMMIT transaction
        await connection.query("COMMIT;");
        res.sendStatus(201);
    } catch (err) {
        // ROLLBACK transaction
        await connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router POST new org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        // RELEASE connection to DB
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
    let newContacts;
    let editContacts;

    if (contacts && contacts.length > 0) {
        // Grab newly generated contacts to add to this organization
        newContacts = contacts.filter((contact) => !contact.id);

        // Grab contacts to edit
        editContacts = contacts.filter((contact) => contact.id);
    }

    try {
        const { latitude, longitude } = await convertCityStateToLatLong(
            address.city,
            address.state
        );

        // establish connection to DB
        connection = await pool.connect();

        // Begin transaction
        await connection.query("BEGIN;");

        // EDIT ORG
        let addressId = await putOrganization(connection, {
            ...org,
            organizationId,
        });

        // EDIT ADDRESS
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
        const contactIdsToDelete = await getContactIdsToDeleteFromOrg(
            connection,
            editContacts,
            organizationId
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

        // COMMIT transaction
        await connection.query("COMMIT;");
        res.sendStatus(204);
    } catch (err) {
        // ROLLBACK transaction
        await connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router PUT edit org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        // RELEASE connection to DB
        await connection.release();
    }
});

/**
 * UPDATE organization as verified
 */
router.put("/verify/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = `UPDATE "organization"
                              SET "date_verified" = CURRENT_DATE
                           WHERE id = $1;`;

        await pool.query(queryText, [id]);
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
 * UPDATE organization as unverified
 */
router.put("/unverify/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = `UPDATE "organization"
                              SET "date_verified" = null
                           WHERE id = $1;`;

        await pool.query(queryText, [id]);
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

        const organizationDelQuery = `DELETE FROM organization AS o
                WHERE o.id = $1 
                RETURNING o.address_id, o.logo_id;`;

        // delete organization
        const organizationDelResponse = await connection.query(
            organizationDelQuery,
            [organizationId]
        );

        const addressId = organizationDelResponse.rows[0].address_id;
        const logoId = organizationDelResponse.rows[0].logo_id;

        // then delete address
        const addressDelQuery = `DELETE FROM address
                                WHERE address.id = $1;`;

        await connection.query(addressDelQuery, [addressId]);

        // then delete logo
        if (logoId) {
            const logoDelQuery = `DELETE FROM organization_logo AS ol
                                    WHERE ol.id = $1 RETURNING file_path;`;

            const logoDelResponse = await connection.query(logoDelQuery, [
                logoId,
            ]);
            const logoFilePath = logoDelResponse.rows[0].file_path;
            
            // remove the logo from the public/logos path
            fs.unlink(`public/${logoFilePath}`, (err) => {
                if (err) throw err;
            });
        }

        // Commit transaction
        connection.query("COMMIT;");
        res.sendStatus(204);
    } catch (err) {
        // Cancel transaction
        connection.query("ROLLBACK;");
        console.error(
            "[inside organization.router DELETE org] Error in this route",
            err
        );
        res.sendStatus(500);
    } finally {
        // RELEASE connection to DB
        connection.release();
    }
});

module.exports = router;
