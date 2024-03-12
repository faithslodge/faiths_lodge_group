import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, TextField, Stack, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { size } from "@floating-ui/core";

const orgKeyNames = [
  { text: "Organization Name", checkBox: false, keyName: "name", size: 5, variant: "standard", isRequired: true },
  { text: "Website", checkBox: false, keyName: "url", size: 5, variant: "standard" },
  { text: "Logo", checkBox: false, keyName: "logo", size: 2, variant: "standard" },
  { text: "Phone", checkBox: false, keyName: "phone", size: 5, variant: "standard" },
  { text: "Email", checkBox: false, keyName: "email", size: 5, variant: "standard" },
  { text: "Service Explanation", checkBox: false, keyName: "serviceExplanation", size: 6, rows: 3, variant: "outlined" },
  { text: "Mission", checkBox: false, keyName: "mission", size: 6, rows: 3, variant: "outlined" },
  { text: "Notes", checkBox: false, keyName: "notes", size: 12, rows: 3, variant: "outlined" },
  { text: "LinkedIn", checkBox: false, keyName: "linkedInUrl", size: 4, variant: "standard" },
  { text: "Facebook", checkBox: false, keyName: "facebookUrl", size: 4, variant: "standard" },
  { text: "Instagram", checkBox: false, keyName: "instagramUrl", size: 4, variant: "standard" },
  { text: "For Profit", checkBox: true, keyName: "forProfit" },
  { text: "Faith Based", checkBox: true, keyName: "faithBased" },
  { text: "Retreat Center", checkBox: true, keyName: "hasRetreatCenter" },
];

const styleProps = {};

// const checkBoxNames = ["forProfit", "faithBased", "hasRetreatCenter"];

export default function StepOneOrg() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.org);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_ORG_OBJECT", payload: { [keyName]: arg } });
  };

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <React.Fragment>
        <br />
        <center>
          <Typography variant="h4">Organization Details</Typography>
        </center>
        <Grid container spacing={3}>
          {orgKeyNames.map((item, i) => {
            const path = item.keyName;
            if (item.checkBox === false) {
              return (
                <Grid item xs={item.size} key={i}>
                  <TextField
                    variant={item.variant}
                    required={item.isRequired}
                    multiline
                    label={item.text}
                    rows={item.rows}
                    value={newOrg?.path}
                    sx={{ width: "100%" }}
                    onChange={(event) => handleChange(event.target.value, item.keyName)}
                  />
                </Grid>
              );
            }
          })}
        </Grid>

        <br />
        <br />

        <Grid container spacing={3}>
          {orgKeyNames.map((item, i) => {
            const path = item.keyName;
            if (item.checkBox) {
              return (
                <Grid item xs={3} key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={newOrg?.path} onChange={(event) => handleChange(event.target.checked, item.keyName)} />
                    }
                    label={item.text}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </React.Fragment>
    </Box>
  );
}
