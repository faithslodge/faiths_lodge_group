const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

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
 * POST make new contact for organization by id
 */
router.post("/:org_id", rejectUnauthenticated, async (req, res) => {
    const contact = req.body;
    const { org_id } = req.params;
    try {
        const queryText = `INSERT INTO "organization_contact"
            (
                "first_name",
                "last_name",
                "phone",
                "email",
                "title",
                "organization_id"
                ) VALUES ($1, $2, $3, $4, $5, $6);`;

        await pool.query(queryText, [...Object.values(contact), org_id]);
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
 * PUT update contact by id
 */
router.put("/:id", rejectUnauthenticated, async (req, res) => {
    const contact = req.body;
    const { id } = req.params;

    try {
        const queryText = `UPDATE "organization_contact" 
                                SET "first_name" = $1,
                                    "last_name" = $2,
                                    "phone" = $3,
                                    "email" = $4,
                                    "title" = $5
                                WHERE id=$6;`;

        await pool.query(queryText, [...Object.values(contact), id]);
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
