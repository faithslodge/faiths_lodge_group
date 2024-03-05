const express = require('express');
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const postOrganizationWithDetails = require("../modules/organizationService");
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
 * POST make new organization
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  const { organizationDetails } = req.body;
  const { user } = req;
  try {
    const dbRes = await postOrganizationWithDetails(organizationDetails, user);
    res.status(201).send(dbRes); // send the dbRes?
  } catch (err) {
    console.error("[inside organization.router POST new org] Error in this route", err);
    res.sendStatus(500);
  }


});

module.exports = router;
