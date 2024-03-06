const pool = require("./pool");

const putOrganizationWithDetails = async (organizationDetails) => {
    // define DB connection, and ids from created entities
    let connection;

    const { city, state } = organizationDetails.address;
    const lossTypeIds = organizationDetails.lossTypes;
    const serviceTypesIds = organizationDetails.serviceTypes;
    const contacts = organizationDetails.contacts;

};



module.exports = putOrganizationWithDetails;
