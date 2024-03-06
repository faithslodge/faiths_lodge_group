import { Grid, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import OptionChecklist from "../OptionChecklist/OptionChecklist";

const AddOrgOptions = () => {
  const [lossSelect, setLossType] = useState([]);
  const [servSelect, setServices] = useState([]);

  const losses = useSelector((store) => store?.options.lossesReducer);
  const services = useSelector((store) => store?.options.servicesReducer);

  return (
    <Grid container>
      <Grid item xs={12}>
        <OptionChecklist />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Services:</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox id="counseling" name="servSelect[]" value="Counseling" />} label="Counseling" />
            <FormControlLabel
              control={
                <Checkbox id="supportGroups, Spiritual Needs" name="servSelect[]" value="Support Groups,Spiritual Needs" />
              }
              label="Support Groups, Spiritual Needs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="Grief counceling, support groups, camps"
                  name="servSelect[]"
                  value="Grief counceling, support groups, camps"
                />
              }
              label="Grief Counceling, Support Groups, Camps"
            />
            <FormControlLabel control={<Checkbox id="Retreats" name="servSelect[]" value="Retreats" />} label="Retreats" />
            <FormControlLabel
              control={<Checkbox id="Women Retreats" name="servSelect[]" value="Women Retreats" />}
              label="Women Retreats"
            />
            <FormControlLabel
              control={<Checkbox id="Personal Sessions, Retreats" name="servSelect[]" value="Personal Sessions, Retreats" />}
              label="Personal Sessions, Retreats"
            />
            <FormControlLabel
              control={<Checkbox id="Support Groups And Counceling" name="servSelect[]" value="Support Groups And Counceling" />}
              label="Support Groups And Counceling"
            />
            <FormControlLabel
              control={<Checkbox id="Support Groups" name="servSelect[]" value="Support Groups" />}
              label="Support Groups"
            />
            <FormControlLabel
              control={<Checkbox id="Grief Support" name="servSelect[]" value="Grief Support" />}
              label="Grief Support"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AddOrgOptions;
