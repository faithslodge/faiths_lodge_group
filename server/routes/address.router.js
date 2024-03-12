const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET all addresses
 */
router.get("/", rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `SELECT * FROM "address";`;
        const dbRes = await pool.query(queryText);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error(
            "[inside address.router GET all addresses] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * GET address by id
 */
router.get("/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const queryText = `SELECT * FROM "address" WHERE id = $1;`;
        const dbRes = await pool.query(queryText, [id]);
        res.status(200).send(dbRes.rows[0]);
    } catch (err) {
        console.error(
            "[inside address.router GET contact by id] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * POST address performed during organization POST, inside
 * routerService.js.
 */

/**
 * PUT update address by id
 */
router.put("/:id", rejectUnauthenticated, async (req, res) => {
    const address = req.body;
    const { id } = req.params;

    try {
        const queryText = `UPDATE "address" 
                                SET "address_line_1" = $1,
                                    "address_line_2" = $2,
                                    "city" = $3,
                                    "state" = $4,
                                    "state_abbreviation" = $5,
                                    "zip_code" = $6
                                WHERE id = $7;`;

        await pool.query(queryText, [...Object.values(address), id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside address.router PUT address by id] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * DELETE address by id omitted due to Organization table dependency
 */

module.exports = router;
