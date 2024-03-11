import React from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";

const orgKeyNames = ["firstName", "lastName", "phone", "email", "title"];

export default function StepSixReview() {
  const newOrg = useSelector((store) => store.newOrg);

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <React.Fragment>
        <Box>
        <Typography variant="h5">Organization Details</Typography>
          <Typography>Organization Name: {newOrg.org.name}</Typography>
          <Typography>Service Explination: {newOrg.org.serviceExplanation}</Typography>
          <Typography>Mission: {newOrg.org.mission}</Typography>
          <Typography>Website: {newOrg.org.url}</Typography>
          <Typography>Phone: {newOrg.org.phone}</Typography>
          <Typography>Emial: {newOrg.org.email}</Typography>
          <FormControlLabel control={<Checkbox checked={newOrg.org.forProfit} />} label="For Profit" />
          <FormControlLabel control={<Checkbox checked={newOrg.org.faithBased} />} label="Faith Based" />
          <FormControlLabel control={<Checkbox checked={newOrg.org.hasRetreatCenter} />} label="Faith Based" />
          <Typography>{newOrg.org.linkedInUrl}</Typography>
          <Typography>{newOrg.org.facebookUrl}</Typography>
          <Typography>{newOrg.org.instagramUrl}</Typography>
          <Typography>Notes: {newOrg.org.notes}</Typography>
        </Box>
        <Box>
        <Typography variant="h5">Address</Typography>
          <Typography>Address Line 1: {newOrg.address.addressLineOne}</Typography>
          <Typography>Address Line 2: {newOrg.address.addressLineTwo}</Typography>
          <Typography>City: {newOrg.address.city}</Typography>
          <Typography>State: {newOrg.address.state}</Typography>
          <Typography>Zip Code: {newOrg.address.zipCode}</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Contacts</Typography>
          <Typography>First Name: {newOrg.contacts[0].firstName}</Typography>
          <Typography>Last Name: {newOrg.contacts[0].lastName}</Typography>
          <Typography>Title: {newOrg.contacts[0].title}</Typography>
          <Typography>Phone: {newOrg.contacts[0].phone}</Typography>
          <Typography>Email: {newOrg.contacts[0].email}</Typography>
        </Box>
      </React.Fragment>
    </Box>
  );
}
