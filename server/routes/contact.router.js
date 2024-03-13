const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { postContacts, putContacts } = require("../modules/routerService");

/**
 * GET all contacts
 */
router.get("/", rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `SELECT * FROM "organization_contact";`;
        const dbRes = await pool.query(queryText);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error(
            "[inside contact.router GET all contacts] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * GET contact by id
 */
router.get("/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const queryText = `SELECT * FROM "organization_contact" WHERE id = $1;`;
        const dbRes = await pool.query(queryText, [id]);
        res.status(200).send(dbRes.rows[0]);
    } catch (err) {
        console.error(
            "[inside contact.router GET contact by id] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * POST make new contact(s) for organization by org_id
 */
router.post("/:org_id", rejectUnauthenticated, async (req, res) => {
    const { contacts } = req.body;
    const { org_id } = req.params;
    try {
        await postContacts(contacts, org_id, pool);
        res.sendStatus(201);
    } catch (err) {
        console.error(
            "[inside contact.router POST new contact] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * PUT update contact by organization id
 */
router.put("/:org_id", rejectUnauthenticated, async (req, res) => {
    const contact = req.body;
    const {org_id} = req.params;

    try {
        await putContacts([contact], org_id, pool);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside contact.router PUT contact by id] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * DELETE contact by id
 */
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;

    try {
            const queryText = `DELETE FROM "organization_contact" WHERE id = $1;`;

            await pool.query(queryText, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside contact.router DELETE contact by id] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

module.exports = router;
