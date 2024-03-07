const express = require('express');
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const postOrganizationWithDetails = require("../modules/organizationPostService");
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
                          lts.agg_loss_type,
                          sts.agg_service_type,
                          ocs.agg_contacts
                      FROM organization AS o
                      LEFT JOIN address AS a ON o.address_id = a.id
                      LEFT JOIN (
                            SELECT
                                ltbo.organization_id,
                                ARRAY_AGG(json_build_object('id', lt.id, 'name', lt.name)) AS agg_loss_type
                            FROM loss_type_by_organization AS ltbo
                            JOIN loss_type AS lt ON ltbo.loss_id = lt.id
                            GROUP BY ltbo.organization_id
                          ) AS lts ON o.id = lts.organization_id
                      LEFT JOIN (
                            SELECT
                                stbo.organization_id,
                                ARRAY_AGG(json_build_object('id', st.id, 'name', st.name)) AS agg_service_type
                            FROM service_type_by_organization AS stbo
                            JOIN service_type AS st ON stbo.service_id = st.id
                            GROUP BY stbo.organization_id
                          ) AS sts ON o.id = sts.organization_id
                      LEFT JOIN (
                            SELECT
                                oc.organization_id,
                                ARRAY_AGG(json_build_object('id', oc.id, 'firstName', oc.first_name, 'lastName', oc.last_name, 'phone', oc.phone, 'email', oc.email, 'title', oc.title)) AS agg_contacts
                            FROM organization_contact AS oc
                            GROUP BY oc.organization_id
                          ) AS ocs ON o.id = ocs.organization_id;
                      `;

  pool.query(queryText)
  .then((dbRes) => {
    // console.log("response from db:", dbRes);
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
    await postOrganizationWithDetails(organizationDetails);
    res.sendStatus(201);
  } catch (err) {
    console.error("[inside organization.router POST new org] Error in this route", err);
    res.sendStatus(500);
  }
});

/**
 * PUT edit organization
 */
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const organizationId = req.params.id;
  const { organizationDetails } = req.body;
  const { user } = req;
  try {

    res.sendStatus(204);
  } catch (err) {
    console.error("[inside organization.router PUT edit org] Error in this route", err);
    res.sendStatus(500);
  }
});

/**
 * DELETE organization
 */
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  const organizationId = req.params.id;
  let connection;
  try {
    connection = await pool.connect();
    
    // Begin transaction
    connection.query("BEGIN;");
    
    const organizationDelQuery = `DELETE FROM organization
    WHERE organization.id = $1 RETURNING organization.address_id;`;
    
    // delete organization
    const organizationDelResponse = await connection.query(organizationDelQuery, [organizationId]);
    
    const addressId = organizationDelResponse.rows[0].address_id;
    
    // then delete address
    const addressDelQuery = `DELETE FROM address
                                WHERE address.id = $1;`

    const addressDelResponse = await connection.query(addressDelQuery, [addressId]);

    // Commit transaction
    connection.query("COMMIT;");
    res.sendStatus(204);
  } catch (err) {
    // Cancel transaction
    connection.query("ROLLBACK;");
    console.error("[inside organization.router PUT edit org] Error in this route", err);
    res.sendStatus(500);
  } finally {
    connection.release();
  } 
});

module.exports = router;
