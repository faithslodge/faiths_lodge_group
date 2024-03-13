const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { postContacts } = require("../modules/routerService");

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
 * PUT update contact by id, id located in contact obj
 */
router.put("/", rejectUnauthenticated, async (req, res) => {
    const { id, firstName, lastName, phone, email, title } = req.body;

    try {
        const queryText = `UPDATE "organization_contact" 
                                SET "first_name" = $1,
                                    "last_name" = $2,
                                    "phone" = $3,
                                    "email" = $4,
                                    "title" = $5
                                WHERE id=$6;`;

        await pool.query(queryText, [firstName, lastName, phone, email, title, id]);
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
 * DELETE contact by id, id located in contact obj
 */
router.delete("/:", rejectUnauthenticated, async (req, res) => {
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
