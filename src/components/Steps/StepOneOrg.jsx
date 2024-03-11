import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const orgKeyNames = [
  "name",
  "serviceExplanation",
  "logo",
  "mission",
  "notes",
  "url",
  "phone",
  "email",
  "linkedInUrl",
  "facebookUrl",
  "instagramUrl",
];

const checkBoxNames = ["forProfit", "faithBased", "hasRetreatCenter"];

export default function StepOneOrg() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.org);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_ORG_OBJECT", payload: { [keyName]: arg } });
  };

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <React.Fragment>
        <Box>
          {orgKeyNames.map((keyName, i) => (
            <TextField
              label={keyName}
              value={newOrg?.keyName}
              key={i}
              onChange={(event) => handleChange(event.target.value, keyName)}
            />
          ))}
        </Box>

        <Box>
          {checkBoxNames.map((keyName, i) => (
            <FormControlLabel
              control={<Checkbox checked={newOrg.keyName} onChange={(event) => handleChange(event.target.checked, keyName)} />}
              label={keyName}
            />
          ))}
        </Box>
      </React.Fragment>
    </Box>
  );
}
