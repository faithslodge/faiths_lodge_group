const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// GET ALL LOGOS
router.get("/", async (req, res) => {
    const queryText = `SELECT * FROM "organization_logo";`;

    try {
        const dbRes = await pool.query(queryText);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error("Error with the Get all images route:", err);
        res.sendStatus(500);
    }
});

// GET LOGO BY ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const queryText = `SELECT * FROM "organization_logo" WHERE id = $1;`;

    try {
        const dbRes = await pool.query(queryText, [id]);
        res.status(200).send(dbRes.rows);
    } catch (err) {
        console.error("Error with the Get all images route:", err);
        res.sendStatus(500);
    }
});

/**
 * POST LOGO
 */
router.post("/", upload.single("logo_to_upload"), async (req, res) => {
    const { file } = req; // 'file' is added to req obj by multer middleware

    if (!file) {
        return res.status(400).send("No file was uploaded.");
    }

    try {
        const queryString = `INSERT INTO organization_logo(file_name, data) VALUES($1, $2) RETURNING id;`;
        const queryParams = [file.originalname, file.buffer];
        const dbRes = await pool.query(queryString, queryParams);
        console.log("id of logo just created:", dbRes.rows[0]);

        // send the logo id
        res.json({id: dbRes.rows[0].id});
    } catch (err) {
        console.error("Error saving the logo to the database", err);
        res.status(500).send("Error saving the logo to the database");
    }
});

module.exports = router;
