import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionCheckMenu from "../OptionCheckMenu/OptionCheckMenu";

const AddOrgOptions = ({lossTypes, setLossTypes, serviceTypes, setServiceTypes}) => {
  // const [lossTypes, setLossType] = useState([]);
  // const [sericeTypes, setServices] = useState([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: "FETCH_LOSSES" });
  //   dispatch({ type: "FETCH_SERVICES" });
  // }, []);

  const losses = useSelector((store) => store?.options.lossesReducer);
  const services = useSelector((store) => store?.options.servicesReducer);

  // Need to dispatch lossTypes and serviceTypes
  const handleLog = () => {
    console.log(lossTypes, serviceTypes);
  };

  return (
    <Grid container>
      <Button onClick={handleLog}>Log</Button>
      <Grid item xs={12}>
        <OptionCheckMenu options={losses} optTypes={lossTypes} setOptTypes={setLossTypes} text={"Loss"} />
      </Grid>
      <Grid item xs={12}>
        <OptionCheckMenu options={services} optTypes={serviceTypes} setOptTypes={setServiceTypes} text={"Service"} />
      </Grid>
    </Grid>
  );
};

export default AddOrgOptions;
