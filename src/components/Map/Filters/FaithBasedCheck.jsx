import React, { useState } from "react";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


export default function FaithBasedCheck() {
  const [isChecked, setIsChecked] = useState(false);
  const filteredOrgs = useSelector((store) => store.filters);

  const dispatch = useDispatch();

  const handleChange = (arg) => {
    setIsChecked(arg)
    const newList = filteredOrgs?.filter((org) => {
        if(org.faith_based === true){
            return org
        }
      });
  console.log("NEW_LIST_FAITH", newList)
      dispatch({ type: "SET_FILTER_ORGS", payload: newList });
  };

  return (
    <FormControl sx={{ width: 250 }}>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={(event) => handleChange(event.target.checked)} />}
        label="Faith Based"
      />
    </FormControl>
  );
}
