import React from "react";
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";

const AddOrgAddress = ({
  setStreetAddress,
  setStreetAddressTwo,
  setCity,
  setState,
  setStateAbbreviation,
  setZipCode,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          id="street"
          label="Street Address"
          fullWidth
          onChange={(event) => setStreetAddress(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="streetTwo"
          label="Street Address Line Two"
          fullWidth
          onChange={(event) => setStreetAddressTwo(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="city"
          label="City"
          fullWidth
          onChange={(event) => setCity(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="state"
          label="State"
          fullWidth
          onChange={(event) => setState(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="stateAbbreviation"
          label="State Abbreviation"
          fullWidth
          onChange={(event) => setStateAbbreviation(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="zip"
          label="Zip Code"
          fullWidth
          onChange={(event) => setZipCode(event.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default AddOrgAddress;
