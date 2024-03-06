import React from "react";
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";

const AddOrgOptions = ({
  lossTypes,
  setLossTypes,
  serviceTypes,
  setServiceTypes,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Type of Loss:</FormLabel>
          <FormGroup>
            {/* Loss Types */}
            {lossTypes.map((lossType, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    //id={⁠lossType_${index}⁠}
                    name="loss_type[]"
                    id={`lossType_${index}`}
                    value={lossType}
                    checked={lossTypes.includes(lossType)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setLossTypes([...lossTypes, lossType]);
                      } else {
                        setLossTypes(
                          lossTypes.filter((type) => type !== lossType)
                        );
                      }
                    }}
                  />
                }
                label={lossType}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Service Types:</FormLabel>
          <FormGroup>
            {/* Service Types */}
            {serviceTypes.map((serviceType, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    
                    id={`serviceType_${index}`}
                    name="service_types[]"
                    value={serviceType}
                    checked={serviceTypes.includes(serviceType)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setServiceTypes([...serviceTypes, serviceType]);
                      } else {
                        setServiceTypes(
                          serviceTypes.filter((type) => type !== serviceType)
                        );
                      }
                    }}
                  />
                }
                label={serviceType}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AddOrgOptions;
