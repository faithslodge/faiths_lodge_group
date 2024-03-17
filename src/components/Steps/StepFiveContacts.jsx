import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PhoneNumberFormatter from "../../utils/PhoneNumberFormatter/PhoneNumberFormatter";

// Array used to conditionally render and style different form inputs
const orgKeyNames = [
  { text: "First Name", checkBox: false, keyName: "firstName", size: 8 },
  { text: "Last Name", checkBox: false, keyName: "lastName", size: 8 },
  { text: "Title", checkBox: false, keyName: "title", size: 8 },
  { text: "Phone", checkBox: false, keyName: "phone", size: 8 , inputProps: {inputComponent: PhoneNumberFormatter}},
  { text: "Email", checkBox: false, keyName: "email", size: 8 },
];

export default function StepFiveContacts() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.newContact);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_NEW_CONTACT", payload: { [keyName]: arg } });
  };

  return (
    <Box sx={{ width: "60%", m: "auto" }}>
      <React.Fragment>
        <br />
        <center>
          <Typography variant="h4" mb={5}>Organization Contact</Typography>
        </center>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {orgKeyNames.map((elem, i) => {
            const path = elem.keyName;
            return (
              <Grid item xs={elem.size} key={i}>
                <TextField
                  variant="standard"
                  label={elem.text}
                  value={newOrg?.[path]}
                  key={i}
                  sx={{ width: "100%" }}
                  InputProps={elem.inputProps}
                  onChange={(event) => handleChange(event.target.value, elem.keyName)}
                />
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    </Box>
  );
}
