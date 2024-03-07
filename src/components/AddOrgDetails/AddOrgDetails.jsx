//
import React from "react";
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Checkbox, FormControlLabel, Button, FormGroup, FormControl, FormLabel, Grid } from "@mui/material";

const AddOrgDetails = ({
  setOrgName,
  setServiceExplanation,
  setMission,
  setNotes,
  setUrl,
  setPhone,
  setEmail,
  setForProfit,
  setFaithBased,
  setHasRetreatCenter,
  setLinkedInUrl,
  setFacebookUrl,
  setInstagramUrl,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField id="name" label="Organization Name" fullWidth onChange={(event) => setOrgName(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="serviceExplanation"
          label="Service Explanation"
          fullWidth
          onChange={(event) => setServiceExplanation(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField id="mission" label="Mission" fullWidth onChange={(event) => setMission(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="notes" label="Notes" fullWidth onChange={(event) => setNotes(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="url" label="URL" fullWidth onChange={(event) => setUrl(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="phone" label="Phone" type="tel" fullWidth onChange={(event) => setPhone(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="email" label="Email" type="email" fullWidth onChange={(event) => setEmail(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel control={<Checkbox onChange={(event) => setForProfit(event.target.checked)} />} label="For Profit" />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel control={<Checkbox onChange={(event) => setFaithBased(event.target.checked)} />} label="Faith Based" />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox onChange={(event) => setHasRetreatCenter(event.target.checked)} />}
          label="Has Retreat Center"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField id="linkedInUrl" label="LinkedIn URL" fullWidth onChange={(event) => setLinkedInUrl(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="facebookUrl" label="Facebook URL" fullWidth onChange={(event) => setFacebookUrl(event.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField id="instagramUrl" label="Instagram URL" fullWidth onChange={(event) => setInstagramUrl(event.target.value)} />
      </Grid>
    </Grid>
  );
};

export default AddOrgDetails;

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
