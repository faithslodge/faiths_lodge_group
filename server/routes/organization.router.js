const express = require('express');
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all organizations 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  
  const queryText = `SELECT * FROM "organization"`;

  pool.query(queryText)
  .then((dbRes) => {
    console.log("response from db:", dbRes);
    res.status(200).send(dbRes.rows);
  })
  .catch((err) => {
    console.error("[inside organization.router GET all orgs] Error in this route", err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
