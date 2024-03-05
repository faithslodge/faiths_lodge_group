import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";
import OptionsList from "../../components/OptionsList/OptionsList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OptionsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_LOSSES" });
    dispatch({ type: "FETCH_SERVICES" });
  }, []);

  const losses = useSelector((store) => store?.options.lossesReducer);
  const services = useSelector((store) => store?.options.servicesReducer);

  return (
    <Box sx={{ width: "fit-content", display: "flex", flexDirection: "row", margin: "auto", alignItems: "flex-start" }}>
      <OptionsList text="Type of Loss" options={losses}/>
      <OptionsList text="Services" options={services} />
    </Box>
  );
};

export default OptionsPage;
