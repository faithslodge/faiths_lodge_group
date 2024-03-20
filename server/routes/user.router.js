const express = require("express");
const {
    rejectUnauthenticated,
    rejectUnauthorized,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, async (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// GET all users from database (admins only)
router.get(
    "/getUsers",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        try {
            // return all users but the user with id of 1,
            // the root user has id = 1.
            const queryText = `SELECT * FROM "user" WHERE id <> 1;`;

            const dbRes = await pool.query(queryText);
            res.status(200).send(dbRes.rows);
        } catch (err) {
            console.error("Error with accessing all user information:", err);
            res.sendStatus(500);
        }
    }
);

// POST to register new user
router.post("/register", (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id;`;
    pool.query(queryText, [username, password])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("User registration failed: ", err);
            res.sendStatus(500);
        });
});

// POST login user, (user cookie in 'res' object for browser to store)
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});

// POST logout user (clear browser cookies)
router.post("/logout", (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

// PUT to edit the is_admin field in DB, cannot edit current user (admins only)
router.put(
    "/editAdmin/:id",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        const { id } = req.params;
        const { isAdmin } = req.body;

        try {
            // cannot edit the admin property for yourself
            if (req.user.id == id) {
                res.sendStatus(403);
            } else {
                const queryText = `UPDATE "user" SET "is_admin" = $1
                            WHERE "user".id = $2;`;

                await pool.query(queryText, [isAdmin, id]);
                res.sendStatus(204);
            }
        } catch (err) {
            console.error(
                "[inside user.router PUT admin edit selected user] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

/**  FUTURE IMPLEMENTATION */
// PUT to edit the current user password
router.put(
    "/editPassword",
    rejectUnauthenticated,
    async (req, res) => {
        const { id } = req.user;
        const password = encryptLib.encryptPassword(req.body.password);

        try {
                const queryText = `UPDATE "user" SET "password" = $1
                            WHERE id = $2;`;

                await pool.query(queryText, [ password, id]);
                res.sendStatus(204);
        } catch (err) {
            console.error(
                "[inside user.router PUT change user password] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

// DELETE to delete the desired user, cannot delete current user (admins only)
router.delete(
    "/:id",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        const loggedInUserId = req.user.id;
        const userToDeleteId = req.params.id;

        try {
            // cannot delete yourself
            if (loggedInUserId == userToDeleteId) {
                res.sendStatus(403);
            } else {
                const queryText = `DELETE FROM "user" WHERE id = $1;`;

                await pool.query(queryText, [userToDeleteId]);
                res.sendStatus(204);
            }
        } catch (err) {
            console.error(
                "[inside user.router DELETE admin delete selected user] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

module.exports = router;
