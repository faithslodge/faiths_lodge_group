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
  
  const queryText = `
          SELECT
            o.id,
            o.name,
            o.verified_by,
            o.service_explanation,
            o.logo,
            o.mission,
            o.notes,
            o.url,
            o.phone,
            o.email,
            o.for_profit,
            o.faith_based,
            o.has_retreat_center,
            o.linked_in_url,
            o.facebook_url,
            o.instagram_url,
            o.date_verified,
            a.address_line_1,
            a.address_line_2,
            a.city,
            a.state,
            a.zip_code,
            a.latitude,
            a.longitude,
            lt.agg_loss_type,
            st.agg_service_type
        FROM organization o
        JOIN address a ON o.address_id = a.id
        LEFT JOIN (
            SELECT
                loss_type_by_organization.organization_id,
                STRING_AGG(loss_type.name, ', ') AS agg_loss_type
            FROM loss_type_by_organization
            JOIN loss_type ON loss_type_by_organization.loss_id = loss_type.id
            GROUP BY loss_type_by_organization.organization_id
        ) lt ON o.id = lt.organization_id
        LEFT JOIN (
            SELECT
                service_type_by_organization.organization_id,
                STRING_AGG(service_type.name, ', ') AS agg_service_type
            FROM service_type_by_organization
            JOIN service_type ON service_type_by_organization.service_id = service_type.id
            GROUP BY service_type_by_organization.organization_id
        ) st ON o.id = st.organization_id;
  `;

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
    const dbRes = await postOrganizationWithDetails(organizationDetails);
    res.status(201).send(dbRes); // send the dbRes?
  } catch (err) {
    console.error("[inside organization.router POST new org] Error in this route", err);
    res.sendStatus(500);
  }
});

module.exports = router;
