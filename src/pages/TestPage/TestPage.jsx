import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const steps = ['Enter Organization Details', 'Enter Address', 'Select Services Provided', 'Select Type of Losses', 'Add Contacts'];
const orgKeyNames = ['name',
    'serviceExplanation',
    'logo',        
    'mission',
    'notes',
    'url',
    'phone',
    'email',
    'forProfit',
    'faithBased',
    'hasRetreatCenter',
    'linkedInUrl',
    'facebookUrl',
    'instagramUrl']

export default function TestPage() {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const newOrg = useSelector(store => store.newOrg)

  const handleChange = (arg, keyName)=>{
    dispatch({type: "SET_ORG_OBJECT", payload: {[keyName]: arg}})
  }

  const handleNext = () => {
    dispatch({type: "EDIT_ORG", payload: orgOne})
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '70%' , m: "auto"}}>
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/* <TextField label="name" value={newOrg?.name} onChange={(event)=> handleChange(event.target.value, "name")}/>
          <TextField label="notes" value={newOrg?.notes} onChange={(event)=> handleChange(event.target.value, "notes")}/> */}
          {orgKeyNames.map(org => (
            <TextField label={org} value={newOrg?.org} onChange={(event)=> handleChange(event.target.value, org)}/>
          ))}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}