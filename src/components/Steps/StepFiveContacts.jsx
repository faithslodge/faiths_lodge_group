import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const orgKeyNames = ["firstName", "lastName", "phone", "email", "title"];

export default function StepFiveContacts() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.newContact);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_NEW_CONTACT", payload: { [keyName]: arg } });
  };

  const handleSave = () => {
    dispatch({ type: "COMPLETE_CONTACTS", payload: newOrg });
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
        {/* <Button onClick={handleSave} variant="contained" color="primary" >Save contact</Button> */}
      </React.Fragment>
    </Box>
  );
}
