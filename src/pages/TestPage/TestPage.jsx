import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StepOneOrg from "../../components/Steps/StepOneOrg";
import StepTwoAddress from "../../components/Steps/StepTwoAddress";
import StepThreeLosses from "../../components/Steps/StepThreeLosses";
import StepFourServices from "../../components/Steps/StepFourServices";

const steps = [
  "Enter Organization Details",
  "Enter Address",
  "Select Services Provided",
  "Select Type of Losses",
  "Add Contacts",
];

export default function TestPage() {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const newOrg = useSelector((store) => store.newOrg.newOrgReducer);

  const handleChange = (arg, keyName) => {
    dispatch({ type: "SET_ORG_OBJECT", payload: { [keyName]: arg } });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepView = () => {
    switch (activeStep) {
      case 0:
        return <StepOneOrg />;
      case 1:
        return <StepTwoAddress />;
      case 2:
        return <StepThreeLosses />;
      case 3:
        return <StepFourServices />;
      default:
        return <h1>default</h1>;
    }
  };

  return (
    <Box sx={{ width: "70%", m: "auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <>
            <h1>{activeStep}</h1>
            {stepView()}
          </>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
