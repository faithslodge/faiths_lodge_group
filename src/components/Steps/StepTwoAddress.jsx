import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StateSelector from "../Map/Filters/StateSelector";
import US_STATES from "../../constants/US_STATES";

// Array used to conditionally render and style different form inputs
const orgKeyNames = [
  { text: "Address Line 1", isRequired: false, keyName: "addressLineOne", size: 5 },
  { text: "Address Line 2", isRequired: false, keyName: "addressLineTwo", size: 5 },
  { text: "City", isRequired: true, keyName: "city", size: 2 },
  { text: "State", isRequired: true, keyName: "state", size: 5 },
  { text: "Zip", isRequired: false, keyName: "zipCode", size: 2 },
];

export default function StepTwoAddress() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.address);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_ADDRESS_OBJECT", payload: { [keyName]: arg } });
  };

  const handleState = (id) => {
    const selectedState = US_STATES.filter((state) => state.id == id);
    console.log(selectedState[0].name, selectedState[0].abbreviation);

    dispatch({
      type: "SET_ADDRESS_OBJECT",
      payload: {
        state: selectedState[0].name,
        stateAbbreviation: selectedState[0].abbreviation,
      },
    });
  };

  return (
    <Box sx={{ width: "50%", m: "auto" }}>
      <br />
      <center>
          <Typography variant="h4" mb={5}>Organization Address</Typography>
        </center>
      <Grid container spacing={3} sx={{justifyContent: "center"}}>
        {orgKeyNames.map((elem, i) => {
          const path = elem.keyName;
          if (elem.keyName === "state") {
            return (
              <Grid item xs={8} key={i} >
                <StateSelector
                  handleChange={(event) => {
                    handleState(event.target.id);
                  }}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={8} key={i}>
                <TextField
                  variant="standard"
                  required={elem.isRequired}
                  label={elem.text}
                  value={newOrg?.[path]}
                  sx={{ width: "100%" }}
                  onChange={(event) => handleChange(event.target.value, elem.keyName)}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </Box>
  );
}
