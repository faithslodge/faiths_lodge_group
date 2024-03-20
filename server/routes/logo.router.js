const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");

// incoming logo file system config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/tmp");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
}); //from multer documentation

// instantiate disk storage
const upload = multer({ storage });

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
    console.log("req.file:", req.file);
    try {
        const logoDataName = req && req.file && req.file.filename;
        const logoFilePath = req && req.file && req.file.path;

        if (logoDataName) {
            // remove the extension on the image if present
            const baseFileName = logoDataName.replace(/\.[^/.]+$/, "");
            // regular expression to match located b/n opening and closing '/'
            // replace with empty string if matched
            // match any period followed by any characters that aren't
            // a ('/' or a '.') one or more times

            // add the '.webp' extension
            const newFileName = `${baseFileName}.webp`;

            // define the final storage place for converted file
            const outputPath = `public/logos/${newFileName}`;

            // convert the file to the '.webp' format
            await sharp(logoFilePath).toFormat("webp").toFile(outputPath);

            // read the data for the file from fs to send to db
            const logoData = fs.readFileSync(outputPath);

            // remove the original file from the '/tmp' directory
            fs.unlink(logoFilePath, (err) => {
                if (err) throw err;
            });

            const queryString = `INSERT INTO organization_logo(file_name, data, file_path) VALUES($1, $2, $3) RETURNING id, file_path;`;
            const queryParams = [newFileName, logoData, `/logos/${newFileName}`];
            const dbRes = await pool.query(queryString, queryParams);

            // send the logo id and the file path
            res.json({ id: dbRes.rows[0].id });
        } else {
            // otherwise send null
            res.json({ id: null });
        }
    } catch (err) {
        console.error("Error saving the logo to the database", err);
        res.status(500).send("Error saving the logo to the database");
    }
});

module.exports = router;
