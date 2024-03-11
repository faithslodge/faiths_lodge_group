import React from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const orgKeyNames = ["addressLineOne", "addressLineTwo", "city", "state", "stateAbbreviation", "zipCode"];

export default function StepTwoAddress() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.address);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_ADDRESS_OBJECT", payload: { [keyName]: arg } });
  };

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <React.Fragment>
        {orgKeyNames.map((keyName, i) => (
          <TextField
            label={keyName}
            value={newOrg?.keyName}
            key={i}
            onChange={(event) => handleChange(event.target.value, keyName)}
          />
        ))}
      </React.Fragment>
    </Box>
  );
}
