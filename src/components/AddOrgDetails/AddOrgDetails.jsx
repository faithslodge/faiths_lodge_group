//
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

const AddOrgDetails = () => {
  const [orgName, setOrgName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [lossType, setLossType] = useState([]);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const submit = (event) => {
    event.preventDefault();
    const NewOrg = {};
    dispatch({
      type: "CREATE_ORGANIZATION",
      payload: NewOrg,
    });
  };
    /*
    dispatch({
        type: 'CREATE_ORG',
        payload: {
            organizationDetails: {
                org: {
                    name,
                    serviceExplanation,
                    // logo,        <<<< this will implement later
                    mission,
                    notes,
                    url,
                    phone,
                    email,
                    forProfit,
                    faithBased,
                    hasRetreatCenter,
                    linkedInUrl,
                    facebookUrl,
                    instagramUrl
                },
                address: {
                    addressLineOne,
                    addressLineTwo,
                    city,
                    state,
                    stateAbbreviation,
                    zipCode 
                },
                lossTypes: [
                    lossType1,
                    lossType2,
                    ...
                ],
                serviceTypes: [
                    serviceType1,
                    serviceType2,
                    ...
                ],
                contacts: [
                    contact1,
                    contact2,
                    ...
                ]
            }
        }
    })

<-------- BELOW IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->

        contact1 = {
            firstName,
            lastName,
            phone,
            email,
            title
        }

<-------- ABOVE IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->
    */
    

  return (
    <form className="add_org">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="name"
            label="Organisation Name"
            fullWidth
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="street"
            label="Street Address"
            fullWidth
            value={streetAddress}
            onChange={(event) => setStreetAddress(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="city"
            label="City"
            fullWidth
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="state"
            label="State"
            fullWidth
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="zip"
            label="Zip"
            fullWidth
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="country"
            label="Country"
            fullWidth
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default AddOrgDetails;
