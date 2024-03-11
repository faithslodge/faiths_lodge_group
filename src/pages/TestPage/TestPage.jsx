import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StepOneOrg from "../../components/Steps/StepOneOrg";
import StepTwoAddress from "../../components/Steps/StepTwoAddress";
import StepThreeLosses from "../../components/Steps/StepThreeLosses";
import StepFourServices from "../../components/Steps/StepFourServices";
import StepFiveContacts from "../../components/Steps/StepFiveContacts";
import StepSixReview from "../../components/Steps/StepSixReview";

const steps = [
  "Enter Organization Details",
  "Enter Address",
  "Select Services Provided",
  "Select Type of Losses",
  "Add Contacts",
  "Review"
];

export default function TestPage() {
  const [activeStep, setActiveStep] = useState(0);
  const newContact = useSelector((store) => store.newOrg.newContact);
  const newOrg = useSelector((store) => store.newOrg);

  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleContacts() {
    dispatch({ type: "COMPLETE_CONTACTS", payload: newContact });
    // dispatch({
    //   type: "CREATE_ORGANIZATION",
    //   payload: { organizationDetails: newOrg },
    // });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleSubmit() {
    dispatch({
      type: "CREATE_ORGANIZATION",
      payload: { organizationDetails: newOrg },
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  const buttonView = ()=>{
    if(activeStep === steps.length - 1 ) {
        return <Button onClick={handleSubmit}>SUBMIT</Button>
      } 
    if(activeStep === steps.length - 2 ){
       return <Button onClick={handleContacts}>NEXT</Button>
    }
    else{
        return <Button onClick={handleNext}>NEXT</Button>
    }
  }

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
      case 4:
        return <StepFiveContacts />;
      case 5:
        return <StepSixReview />;
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
          {stepView()}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {buttonView()}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
