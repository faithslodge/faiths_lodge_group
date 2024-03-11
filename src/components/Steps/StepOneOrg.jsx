import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

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

export default function StepOneOrg() {

  const dispatch = useDispatch();
  const newOrg = useSelector(store => store.newOrg.org)

  const handleChange = (arg, keyName)=>{
    dispatch({type: "SET_ORG_OBJECT", payload: {[keyName]: arg}})
  }

  return (
    <Box sx={{ width: '70%' , m: "auto"}}>
        <React.Fragment>
          {orgKeyNames.map((keyName, i )=> (
            <TextField label={keyName} value={newOrg?.keyName} key={i} onChange={(event)=> handleChange(event.target.value, keyName)}/>
          ))}
        </React.Fragment>
    </Box>
  );
}