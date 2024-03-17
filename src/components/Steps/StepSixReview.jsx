import React from "react";
import { Box, Typography, FormControlLabel, Checkbox, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const overlineFont = {
  fontSize: 14,
  color: "rgba(92, 118, 55, 1)",
  fontWeight: "bold"
};

const boolCheck = (info) => {
  if (info === null) {
    return "";
  } else if (info === true) {
    return "Yes";
  } else if (info === false) {
    return "No";
  }
};


export default function StepSixReview() {
  const newOrg = useSelector((store) => store.newOrg);

  return (
    <Card sx={{ p: 5, width: "70%", m: "auto", boxShadow: 3}}>
      <center>
          <Typography variant="h4" mb={5}>Confirm Details</Typography>
        </center>
      <Grid container justifyContent="space-between" columnGap={3}>
        <Grid item xs={5.5}>
          <Typography variant="h5" component="h3">
            {newOrg.org.name}
          </Typography>
          <br />
          <Typography variant="overline" component="h3" style={overlineFont}>Organization Details</Typography>
          <Typography variant="body2">
            <b>Mission:</b> {newOrg.org.mission}
            <br />
            <br />
          
            <b>Address: </b>
              {newOrg.address.addressLineOne && `${newOrg.address.addressLineOne}, `}
              {newOrg.address.addressLineTwo && `${newOrg.address.addressLineTwo}, `}
              {newOrg.address.city && `${newOrg.address.city}, `}
              {newOrg.address.state && `${newOrg.address.state} `}
              {newOrg.address.zipCode && `${newOrg.address.zipCode}`}
              <br />
            <b>Phone:</b> {newOrg.org.phone} <br />
            <b>Email:</b> {newOrg.org.email} <br />
            <b>Website:</b> {newOrg.org.url} <br />
            <b>Has Retreat?:</b> {boolCheck(newOrg.org.hasRetreatCenter)} <br />
            <b>Faith Based?:</b> {boolCheck(newOrg.org.faithBased)} <br />
            <b>For Profit?:</b> {boolCheck(newOrg.org.forProfit)} <br />
            <b>Facebook: </b>{newOrg.org.facebookUrl} <br />
            <b>Instagram: </b>{newOrg.org.instagramUrl} <br />
            <b>LinkedIn: </b>{newOrg.org.linkedInUrl}
          </Typography><br />
 
        <Typography variant="overline" component="h3" style={overlineFont}>Service Explanation</Typography>
          <Typography variant="body2">{newOrg.org.serviceExplanation}</Typography>

        </Grid>
        <Grid item xs={5.5}>
          <Typography variant="overline" component="h3" style={overlineFont}>Notes</Typography>
          <Typography variant="body2">{newOrg.org.notes}</Typography>
          <br />
          <Typography variant="overline" component="h3" style={overlineFont}>Point of Contact</Typography>
          <Typography variant="body2"><b>First Name:</b> {newOrg.contacts[0].firstName}</Typography>
          <Typography variant="body2"><b>Last Name:</b> {newOrg.contacts[0].lastName}</Typography>
          <Typography variant="body2"><b>Title:</b> {newOrg.contacts[0].title}</Typography>
          <Typography variant="body2"><b>Phone:</b> {newOrg.contacts[0].phone}</Typography>
          <Typography variant="body2"><b>Email:</b> {newOrg.contacts[0].email}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
