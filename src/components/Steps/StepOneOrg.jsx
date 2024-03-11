import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const orgKeyNames = [
  { text: "Name", checkBox: false, keyName: "name" },
  { text: "Service Explanation", checkBox: false, keyName: "serviceExplanation" },
  { text: "Logo", checkBox: false, keyName: "logo" },
  { text: "Mission", checkBox: false, keyName: "mission" },
  { text: "Notes", checkBox: false, keyName: "notes" },
  { text: "Website", checkBox: false, keyName: "url" },
  { text: "Phone", checkBox: false, keyName: "phone" },
  { text: "Email", checkBox: false, keyName: "email" },
  { text: "LinkedIn", checkBox: false, keyName: "linkedInUrl" },
  { text: "Facebook", checkBox: false, keyName: "facebookUrl" },
  { text: "Instagram", checkBox: false, keyName: "instagramUrl" },
  { text: "For Profit", checkBox: true, keyName: "forProfit" },
  { text: "Faith Based", checkBox: true, keyName: "faithBased" },
  { text: "Retreat Center", checkBox: true, keyName: "hasRetreatCenter" },
];

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
        <Box>
          {orgKeyNames.map((item, i) => {
            const path = item.keyName;
            if (item.checkBox === false) {
              return (
                <TextField
                  size="small"
                  label={item.text}
                  value={newOrg?.path}
                  key={i}
                  onChange={(event) => handleChange(event.target.value, item.keyName)}
                />
              );
            }
          })}
        </Box>

        <Box>
          {orgKeyNames.map((item, i) => {
            const path = item.keyName;
            if (item.checkBox) {
              return (
                <FormControlLabel
                  control={
                    <Checkbox checked={newOrg?.path} onChange={(event) => handleChange(event.target.checked, item.keyName)} />
                  }
                  label={item.text}
                  key={i}
                />
              );
            }
          })}
        </Box>

      </React.Fragment>
    </Box>
  );
}
