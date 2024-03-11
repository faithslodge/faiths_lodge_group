import React from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StateSelector from "../Map/Filters/StateSelector";
import US_STATES from "../../constants/US_STATES";

const orgKeyNames = ["addressLineOne", "addressLineTwo", "city", "state", "zipCode"];

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
    <Box sx={{ width: "70%", m: "auto" }}>
      <React.Fragment>
        {orgKeyNames.map((keyName, i) =>
          keyName === "state" ? (
            <StateSelector
              key={i}
              handleChange={(event) => {
                handleState(event.target.id);
              }}
            />
          ) : (
            <TextField
              label={keyName}
              value={newOrg?.keyName}
              key={i}
              onChange={(event) => handleChange(event.target.value, keyName)}
            />
          )
        )}
      </React.Fragment>
    </Box>
  );
}
