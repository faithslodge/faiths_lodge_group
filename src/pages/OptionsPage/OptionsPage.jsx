import { Box } from "@mui/material";
import OptionsList from "../../components/OptionsList/OptionsList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

const OptionsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_LOSSES" });
    dispatch({ type: "FETCH_SERVICES" });
  }, []);

  const losses = useSelector((store) => store?.options.lossesReducer);
  const services = useSelector((store) => store?.options.servicesReducer);

  return (
    <>
    <center>
      <Typography variant="h4" component="h2" pt={5} gutterBottom>Options</Typography>
    </center>
    <Box sx={{ width: "fit-content", display: "flex", flexDirection: "row", margin: "auto", alignItems: "flex-start" }}>
      <OptionsList text="Type of Loss" options={losses} keyText="loss" />
      <OptionsList text="Services" options={services} keyText="service" />
    </Box>
    </>
  );
};

export default OptionsPage;
