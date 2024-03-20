const pool = require("./pool");
const axios = require("axios");

const ORG_GET_QUERY = `
SELECT
    o.id,
    o.logo_id,
    o.name,
    o.verified_by,
    o.service_explanation,
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
    a.id AS address_id,
    a.address_line_1,
    a.address_line_2,
    a.city,
    a.state,
    a.state_abbreviation,
    a.zip_code,
    a.latitude,
    a.longitude,
    lts.agg_loss_type,
    sts.agg_service_type,
    ocs.agg_contacts,
    ocl.file_path
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
    ) AS ocs ON o.id = ocs.organization_id
LEFT JOIN (
      SELECT
      ol.id,
      ol.file_path AS file_path
      FROM organization_logo AS ol
) AS ocl ON o.logo_id = ocl.id
ORDER BY o.name ASC;`;

// translate a city/state to a lat/long to store in DB for this org
async function convertCityStateToLatLong(city, state) {
    const geojson = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}%2C+${state}&format=geojson`,
        {
            headers: {
                "User-Agent": process.env.USER_AGENT,
            },
        }
    );

    const latitude = geojson.data.features[0].geometry.coordinates[1];
    const longitude = geojson.data.features[0].geometry.coordinates[0];
    return { latitude, longitude };
}

// INSERT an address into DB for this organization
async function postAddress(connection, address) {
    const addressQuery = `INSERT INTO "address"
                                    (
                                        "address_line_1",
                                        "address_line_2",
                                        "city",
                                        "state",
                                        "state_abbreviation",
                                        "zip_code",
                                        "latitude",
                                        "longitude"
                                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;

    const addressQueryRes = await connection.query(addressQuery, [
        address.addressLineOne,
        address.addressLineTwo,
        address.city,
        address.state,
        address.stateAbbreviation,
        address.zipCode,
        address.latitude,
        address.longitude,
    ]);

    return addressQueryRes.rows[0].id;
}

// INSERT an organization into DB
async function postOrganization(connection, organization) {
    console.log("[postOrganization] organization:", organization);

    const organizationQuery = `INSERT INTO "organization"
                                    (
                                        "name",
                                        "service_explanation",
                                        "logo_id",
                                        "mission",
                                        "notes",
                                        "url",
                                        "phone",
                                        "email",
                                        "for_profit",
                                        "faith_based",
                                        "has_retreat_center",
                                        "linked_in_url",
                                        "facebook_url",
                                        "instagram_url",
                                        "address_id"
                                    ) VALUES (
                                        $1, $2, $3, $4, $5, $6, $7, $8, $9,
                                        $10, $11, $12, $13, $14, $15
                                        ) RETURNING id;`;

    const organizationQueryRes = await connection.query(organizationQuery, [
        organization.name,
        organization.serviceExplanation,
        organization.logoId,
        organization.mission,
        organization.notes,
        organization.url,
        organization.phone,
        organization.email,
        organization.forProfit,
        organization.faithBased,
        organization.hasRetreatCenter,
        organization.linkedInUrl,
        organization.facebookUrl,
        organization.instagramUrl,
        organization.addressId,
    ]);

    return organizationQueryRes.rows[0].id;
}

// INSERT a service type for this org in DB
async function postServiceTypeByOrganization(
    serviceTypesIds,
    organizationId,
    connection
) {
    // if the org post has service types then associate them
    if (serviceTypesIds && serviceTypesIds.length > 0) {
        const mappedServiceTypesToOrg = serviceTypesIds.map((serviceTypeId) => {
            return { organizationId, serviceTypeId };
        });

        const serviceTypeInputCount = generateNumberOfQueryInputs(
            mappedServiceTypesToOrg
        );

        // format values for multi-line SQL insert
        const serviceQueryParams = mappedServiceTypesToOrg.flatMap(
            (orgWithLossType) => Object.values(orgWithLossType)
        );

        const serviceTypeQuery = `INSERT INTO "service_type_by_organization"
                                        (
                                            "organization_id",
                                            "service_id"
                                            ) VALUES ${serviceTypeInputCount};`;

        // INSERT service_type_by_organization(s)
        await connection.query(serviceTypeQuery, serviceQueryParams);
    }
}

// INSERT a loss type association for this org in DB
async function postLossTypeByOrganization(
    lossTypeIds,
    organizationId,
    connection
) {
    // if the org post has loss types then associate them
    if (lossTypeIds && lossTypeIds.length > 0) {
        // associate the org id with this loss type
        const mappedLossTypesToOrg = lossTypeIds.map((lossTypeId) => {
            return { organizationId, lossTypeId };
        });
        const lossTypeInputCount =
            generateNumberOfQueryInputs(mappedLossTypesToOrg);

        // format for arg array for multi-line SQL insert
        const lossQueryParams = mappedLossTypesToOrg.flatMap((orgWithType) =>
            Object.values(orgWithType)
        );

        const lossTypeQuery = `INSERT INTO "loss_type_by_organization"
                                    (
                                        "organization_id",
                                        "loss_id"
                                        ) VALUES ${lossTypeInputCount};`;

        // INSERT loss_type_by_organization(s)
        await connection.query(lossTypeQuery, lossQueryParams);
    }
}

// INSERT contact into DB for this org
async function postContacts(contacts, organizationId, connection) {
    // if the org post has contact(s) then associate them
    if (contacts && contacts.length > 0) {
        const contactsWithOrg = contacts.map((contact) => {
            return { ...contact, organizationId };
        });
        const contactInputCount = generateNumberOfQueryInputs(contactsWithOrg);

        // format for multi-line SQL insert
        const contactQueryParams = contacts.flatMap((contact) => [
            contact.firstName,
            contact.lastName,
            contact.phone,
            contact.email,
            contact.title,
            organizationId,
        ]);

        const contactQuery = `INSERT INTO "organization_contact"
            (
                "first_name",
                "last_name",
                "phone",
                "email",
                "title",
                "organization_id"
                ) VALUES ${contactInputCount};`;

        await connection.query(contactQuery, contactQueryParams);
    }
}

// This function generates the parameter input count string for an SQL
// query for an array of objects. It maps through the array and counts
// the properties of the objs in the array in sequence for all elements
// of the array.
function generateNumberOfQueryInputs(arrayOfObjs) {
    const propertiesInObj = Object.keys(arrayOfObjs[0]);
    const numPropertiesInObj = propertiesInObj.length;

    // make the multi-line insert parameter input placeholders
    return arrayOfObjs
        .map((obj, i) => {
            // make one line of placeholders for multi-line SQL INSERT
            const array = propertiesInObj.map((property, j) => {
                return `$${i * numPropertiesInObj + (j + 1)}`;
            });
            return "(" + array.join(", ") + ")";
        })
        .join(", ");
}

// UPDATE an organization in DB
async function putOrganization(connection, organization) {
    const organizationQuery = `UPDATE "organization" SET
                                        "name" = $1,
                                        "service_explanation" = $2,
                                        "logo_id" = $3,
                                        "mission" = $4,
                                        "notes" = $5,
                                        "url" = $6,
                                        "phone" = $7,
                                        "email" = $8,
                                        "for_profit" = $9,
                                        "faith_based" = $10,
                                        "has_retreat_center" = $11,
                                        "linked_in_url" = $12,
                                        "facebook_url" = $13,
                                        "instagram_url" = $14
                                WHERE id = $15 RETURNING "address_id";`;

    const organizationQueryRes = await connection.query(organizationQuery, [
        organization.name,
        organization.serviceExplanation,
        organization.logoId,
        organization.mission,
        organization.notes,
        organization.url,
        organization.phone,
        organization.email,
        organization.forProfit,
        organization.faithBased,
        organization.hasRetreatCenter,
        organization.linkedInUrl,
        organization.facebookUrl,
        organization.instagramUrl,
        organization.organizationId,
    ]);

    return organizationQueryRes.rows[0].address_id;
}

// UPDATE an address in DB for this organization
async function putAddress(connection, address) {
    const addressQuery = `UPDATE "address"
                                SET
                                    "address_line_1" = $1,
                                    "address_line_2" = $2,
                                    "city" = $3,
                                    "state" = $4,
                                    "state_abbreviation" = $5,
                                    "zip_code" = $6,
                                    "latitude" = $7,
                                    "longitude" = $8
                                WHERE id = $9;`;
    await connection.query(addressQuery, [
        address.addressLineOne,
        address.addressLineTwo,
        address.city,
        address.state,
        address.stateAbbreviation,
        address.zipCode,
        address.latitude,
        address.longitude,
        address.addressId,
    ]);
}

// UPDATE contacts in DB for this organization
async function putContacts(contacts, organizationId, connection) {
    const orgIdAsInt = parseInt(organizationId);
    // if there are contacts to update
    if (contacts && contacts.length > 0) {

        // generate the $1, $2, ... for SQL query
        const contactInputCount = generateNumberOfQueryInputs(contacts);
        const numPropertiesInContactObj = Object.keys(contacts[0]).length;

        // calculate the position for inserting org id into SQL query params
        const orgIdPositionInQuery = `$${
            contacts.length * numPropertiesInContactObj + 1
        }`;

        // format for multi-line SQL insert
        const contactQueryParams = contacts.flatMap((contact) => {
            return [
                contact.id,
                contact.firstName,
                contact.lastName,
                contact.phone,
                contact.email,
                contact.title,
            ];
        });

        const contactQuery = `UPDATE organization_contact SET
                                    "first_name" = updated_contact.first_name,
                                    "last_name" = updated_contact.last_name,
                                    "phone" = updated_contact.phone,
                                    "email" = updated_contact.email,
                                    "title" = updated_contact.title
                                    FROM (VALUES ${contactInputCount}) AS updated_contact(id, first_name, last_name, phone, email, title)
                                    WHERE organization_contact.organization_id = ${orgIdPositionInQuery} AND organization_contact.id = updated_contact.id::INT;`;

        await connection.query(contactQuery, [
            ...contactQueryParams,
            orgIdAsInt,
        ]);
    }
}

// DELETE all loss type associations for given organization
async function deleteLossTypeAssociations(connection, organizationId) {
    const lossQuery = `DELETE FROM "loss_type_by_organization"
                            WHERE organization_id = $1;`;
    await connection.query(lossQuery, [organizationId]);
}

// DELETE all service type associations for given organization
async function deleteServiceTypeAssociations(connection, organizationId) {
    const serviceQuery = `DELETE FROM "service_type_by_organization"
                            WHERE organization_id = $1;`;
    await connection.query(serviceQuery, [organizationId]);
}

// DELETE contacts missing from organization update
async function deleteContactsOmittedFromOrgUpdate(
    connection,
    organizationId,
    contactIds
) {
    // if there are contacts to disassociate from this org on UPDATE
    if (contactIds && contactIds.length > 0) {
        const inputIdCount = contactIds.map((id, i) => {
            return `$${i + 1}`;
        });

        // calculate the position for inserting org id into SQL query params
        const orgIdPositionInQuery = `$${inputIdCount.length + 1}`;

        const inputIdPlaceholder = `(${inputIdCount.join(", ")})`;

        const serviceQuery = `WITH delete_contact AS (
                                                        SELECT id
                                                        FROM organization_contact
                                                        WHERE id IN ${inputIdPlaceholder} AND organization_id = ${orgIdPositionInQuery}
                                                     )
                                DELETE FROM organization_contact
                                WHERE id IN (SELECT id FROM delete_contact);`;
        await connection.query(serviceQuery, [...contactIds, organizationId]);
    }
}

async function getContactIdsToDeleteFromOrg(
    connection,
    contactsToKeep,
    organizationId
) {
    // if there are contacts to keep associated w/ org on UPDATE
    if (contactsToKeep && contactsToKeep.length > 0) {
        const contactGetText = `SELECT * FROM "organization_contact" WHERE "organization_id" = $1;`;
        const getContactsInOrgResult = await connection.query(contactGetText, [
            organizationId,
        ]);
        // get the current contacts associated w/ org from DB
        const currentContactsInOrg = getContactsInOrgResult.rows;
        const currentContactIds = currentContactsInOrg.map((contact) => contact.id);

        // grab ids from contacts we want to keep
        const contactIdsToKeep = contactsToKeep.map((contact) => contact.id);
        
        // determine the contacts from DB that should be removed
        const contactIdsToDelete = currentContactIds.filter(
            (id) => !contactIdsToKeep.includes(id)
        );
        return contactIdsToDelete;
    }
}

module.exports = {
    ORG_GET_QUERY,
    postContacts,
    postAddress,
    postLossTypeByOrganization,
    postServiceTypeByOrganization,
    postOrganization,
    convertCityStateToLatLong,
    putOrganization,
    putAddress,
    deleteLossTypeAssociations,
    deleteServiceTypeAssociations,
    putContacts,
    deleteContactsOmittedFromOrgUpdate,
    getContactIdsToDeleteFromOrg,
};
