//
import React from "react";
import AddOrgDetails from "../../components/AddOrgDetails/AddOrgDetails";
import AddOrgAddress from "../../components/AddOrgAddress/AddOrgAddress";
import AddOrgOptions from "../../components/AddOrgOptions/AddOrgOptions";

const AddOrgPage = () => {
  /*
    dispatch({
        type: 'CREATE_ORG',
        payload: {
            organizationDetails: {
                org: {
                    name,
                    serviceExplanation,
                    // logo,        <<<< this will implement later
                    mission,
                    notes,
                    url,
                    phone,
                    email,
                    forProfit,
                    faithBased,
                    hasRetreatCenter,
                    linkedInUrl,
                    facebookUrl,
                    instagramUrl
                },
                address: {
                    addressLineOne,
                    addressLineTwo,
                    city,
                    state,
                    stateAbbreviation,
                    zipCode 
                },
                lossTypes: [
                    lossType1,
                    lossType2,
                    ...
                ],
                serviceTypes: [
                    serviceType1,
                    serviceType2,
                    ...
                ],
                contacts: [
                    contact1,
                    contact2,
                    ...
                ]
            }
        }
    })

<-------- BELOW IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->

        contact1 = {
            firstName,
            lastName,
            phone,
            email,
            title
        }

<-------- ABOVE IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->
    */

  return (
    <>
      <AddOrgDetails />
      <AddOrgAddress />
      <AddOrgOptions />
    </>
  );
};

export default AddOrgPage;
