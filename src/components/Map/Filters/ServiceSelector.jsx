import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ServiceSelector() {

  const [stateServiceType, setSrviceType] = useState([]);
  const services = useSelector((store) => store.options.servicesReducer);
  const filteredOrgs = useSelector((store) => store.filters);

  const dispatch = useDispatch();

  const handleServiceChange = (event) => {
    const serviceArray = event.target.value;
    setSrviceType(serviceArray);

    let newList = [];
    for (let service of serviceArray) {
      newList = filteredOrgs?.filter((org) => {
        for( let orgService of org?.agg_service_type){
            if(service == orgService.name){
                return org
            } 
        }
      });
    }
    console.log("NEW LIST", newList)
    dispatch({ type: "SET_FILTER_ORGS", payload: newList });
  };

  return (
    <FormControl sx={{ width: 250 }}>
      <InputLabel id="demo-multiple-checkbox-label">Services Provided</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={stateServiceType}
        onChange={handleServiceChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {services?.map((type, i) => (
          <MenuItem value={type.name} key={type.id}>
            <Checkbox checked={stateServiceType?.includes(type.name)} id={type.name.toString()} />
            <ListItemText primary={type.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
