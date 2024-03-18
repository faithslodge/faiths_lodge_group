import * as React from "react";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import Stack from "@mui/joy/Stack";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import StateSelector from "./StateSelector";
import OrderSelector from "./OrderSelector";
import { useDispatch, useSelector } from "react-redux";
import US_STATES from "../../../constants/US_STATES";
import LossSelector from "./LossSelector";
import FaithBasedCheck from "./FaithBasedCheck";
import ServiceSelector from "./ServiceSelector";

export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const storeOrgs = useSelector((store) => store.organizations);

  const dispatch = useDispatch();

  const handleState = (arg) => {
    const stateArray = US_STATES.filter((state) => state.id == arg);
    const stateName = stateArray[0].name.toLowerCase();

    const newList = storeOrgs.filter((org) => {
      return arg.toLowerCase() === "" ? org : org.state.toLowerCase().includes(stateName);
    });

    dispatch({ type: "SET_FILTER_ORGS", payload: newList });
  };

  const handleClear = ()=>{
    dispatch({ type: "SET_FILTER_ORGS", payload: storeOrgs });
  }

  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: "space-between" }}
      flexWrap="wrap"
      sx={{ minWidth: 0 }}
    >
      <Button variant="outlined" color="neutral" startDecorator={<FilterAltOutlined />} onClick={() => setOpen(true)}>
        Filters
      </Button>
      <OrderSelector />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <Button onClick={handleClear} >Clear Filters</Button>
          <ModalClose />
          <StateSelector handleChange={(event) => handleState(event.target.id)} />
          <LossSelector />
          <ServiceSelector />
          <FaithBasedCheck />
        </Stack>
      </Drawer>
    </Stack>
  );
}
