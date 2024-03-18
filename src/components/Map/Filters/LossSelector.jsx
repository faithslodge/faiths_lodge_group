import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import US_STATES from "../../../constants/US_STATES";

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

export default function LossSelector() {
  const [open, setOpen] = useState(false);
  const [stateLossTypes, setStateLossTypes] = useState([]);
  const storeOrgs = useSelector((store) => store.organizations);
  const losses = useSelector((store) => store.options.lossesReducer);

  const dispatch = useDispatch();

  const handleState = (arg) => {
    const stateArray = US_STATES.filter((state) => state.id == arg);
    const stateName = stateArray[0].name.toLowerCase();

    const newList = storeOrgs.filter((org) => {
      return arg.toLowerCase() === "" ? org : org.state.toLowerCase().includes(stateName);
    });

    dispatch({ type: "SET_FILTER_ORGS", payload: newList });
  };

  const handleLossTypeChange = (event) => {
    const lossArray = event.target.value;
    setStateLossTypes(lossArray);

    let newList = [];
    for (let loss of lossArray) {
      newList = storeOrgs?.filter((org) => {
        for( let orgLoss of org?.agg_loss_type){
            if(loss == orgLoss.id){
                return org
            } 
        }
      });
    }
    console.log("NEW LIST", newList)
  };

  return (
    <FormControl sx={{ width: 250 }}>
      <InputLabel id="demo-multiple-checkbox-label">Type of Loss</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={stateLossTypes}
        onChange={handleLossTypeChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {losses?.map((type, i) => (
          <MenuItem value={type.id} key={type.id}>
            <Checkbox checked={stateLossTypes?.includes(type.id)} id={type.id.toString()} />
            <ListItemText primary={type.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
