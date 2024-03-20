const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET all types of services
 */
router.get("/service", rejectUnauthenticated, async (req, res) => {
    const queryText = `SELECT * FROM "service_type"
                        ORDER BY name ASC;`;
    try {
        const dbRes = await pool.query(queryText);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error(
            "[inside option.router GET all types of service] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * POST make new service_type
 */
router.post("/service", rejectUnauthenticated, async (req, res) => {
    const { service } = req.body;
    try {
        const queryText = `INSERT INTO "service_type"
                                ("name") VALUES ($1);`;

        await pool.query(queryText, [service]);
        res.sendStatus(201);
    } catch (err) {
        console.error(
            "[inside option.router POST service type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * PUT update type of service
 */
router.put("/service/:id", rejectUnauthenticated, async (req, res) => {
    console.log("req.body:", req.body)
    const { service } = req.body;
    const { id } = req.params;

    try {
        const queryText = `UPDATE service_type SET "name"=$1 WHERE id=$2;`;

        await pool.query(queryText, [service, id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside option.router PUT service type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * DELETE type of service
 */
router.delete("/service/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const queryText = `DELETE FROM service_type WHERE id=$1;`;

        await pool.query(queryText, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside option.router DELETE service type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * GET all types of loss
 */
router.get("/loss", rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `SELECT * FROM "loss_type"
        ORDER BY name ASC;`;
        const dbRes = await pool.query(queryText);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error(
            "[inside option.router GET all types of loss] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * POST make new type of loss
 */
router.post("/loss", rejectUnauthenticated, async (req, res) => {
    const { loss } = req.body;

    try {
        const queryText = `INSERT INTO "loss_type"
                                ("name") VALUES ($1);`;

        await pool.query(queryText, [loss]);
        res.sendStatus(201);
    } catch (err) {
        console.error(
            "[inside option.router POST loss type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * PUT update type of loss
 */
router.put("/loss/:id", rejectUnauthenticated, async (req, res) => {
    const { loss } = req.body;
    const { id } = req.params;

    try {
        const queryText = `UPDATE loss_type SET "name"=$1 WHERE id=$2;`;

        await pool.query(queryText, [loss, id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside option.router PUT loss type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

/**
 * PUT DELETE type of loss
 */
router.delete("/loss/:id", rejectUnauthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const queryText = `DELETE FROM loss_type WHERE id=$1;`;

        await pool.query(queryText, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(
            "[inside option.router DELETE loss type] Error in this route",
            err
        );
        res.sendStatus(500);
    }
});

module.exports = router;
