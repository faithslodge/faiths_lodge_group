import React from "react";
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function StepThreeLosses() {
  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.lossTypes);
  const options = useSelector((store) => store.options.lossesReducer);

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <center>
        <React.Fragment>
          <br />
          <FormControl component="fieldset" sx={{ justifyContent: "center", minWidth: 350 }}>
            <Typography variant="h4" mb={5}>Select Types of Loss</Typography>
            <FormGroup>
              {options?.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`${option?.id}`}
                      value={option?.name}
                      checked={newOrg?.includes(option?.id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          dispatch({ type: "SET_NEW_LOSS", payload: [...newOrg, option?.id] });
                        } else {
                          dispatch({ type: "SET_NEW_LOSS", payload: newOrg?.filter((type) => type !== option?.id) });
                        }
                      }}
                    />
                  }
                  label={option?.name}
                  key={option?.id}
                />
              ))}
            </FormGroup>
          </FormControl>
        </React.Fragment>
      </center>
    </Box>
  );
}
