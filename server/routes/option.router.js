const express = require('express');
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all types of services
 */
router.get('/service', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "service_type"`;

  pool.query(queryText)
  .then((dbRes) => {
    console.log("response from db:", dbRes);
    res.status(200).send(dbRes.rows);
  })
  .catch((err) => {
    console.error("[inside option.router GET all types of service] Error in this route", err);
    res.sendStatus(500);
  })
});

/**
 * POST make new service_type
 */
router.post('/service', rejectUnauthenticated, (req, res) => {

  const typeToInsert = req.body.service;
  
  const queryText = 
    `INSERT INTO "service_type"
        (
          "name"
        ) VALUES (
                    $1
                 )`;

  pool.query(queryText, [typeToInsert])
  .then((dbRes) => {
    console.log("response from db:", dbRes);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error("[inside option.router POST service type] Error in this route", err);
    res.sendStatus(500);
  })
});

/**
 * GET all types of loss
 */
router.get('/loss', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "loss_type"`;

  pool.query(queryText)
  .then((dbRes) => {
    console.log("response from db:", dbRes);
    res.status(200).send(dbRes.rows);
  })
  .catch((err) => {
    console.error("[inside option.router GET all types of loss] Error in this route", err);
    res.sendStatus(500);
  })
});

/**
 * POST make new type of loss
 */
router.post('/loss', rejectUnauthenticated, (req, res) => {

  const typeToInsert = req.body.loss;
  
  const queryText = 
    `INSERT INTO "loss_type"
        (
          "name"
        ) VALUES (
                    $1
                 )`;

  pool.query(queryText, [typeToInsert])
  .then((dbRes) => {
    console.log("response from db:", dbRes);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error("[inside option.router POST loss type] Error in this route", err);
    res.sendStatus(500);
  })
});

module.exports = router;
