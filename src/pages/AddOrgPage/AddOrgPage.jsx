import React, { useState } from "react";
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
import AddOrgDetails from "../../components/AddOrgDetails/AddOrgDetails";
import AddOrgOptions from "../../components/AddOrgOptions/AddOrgOptions";
import AddOrgAddress from "../../components/AddOrgAddress/AddOrgAddress";

const AddOrgPage = () => {
  // Organization Details State
  const [orgName, setOrgName] = useState("");
  const [serviceExplanation, setServiceExplanation] = useState("");
  const [mission, setMission] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [forProfit, setForProfit] = useState(false);
  const [faithBased, setFaithBased] = useState(false);
  const [hasRetreatCenter, setHasRetreatCenter] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  // Organization Address State
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddressTwo, setStreetAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateAbbreviation, setStateAbbreviation] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Organization Options State
  const [lossTypes, setLossTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const dispatch = useDispatch();

  const submit = (event) => {
    event.preventDefault();
    const newOrg = {
      organizationDetails: {
        org: {
          orgName,
          serviceExplanation,
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
          instagramUrl,
        },
        address: {
          streetAddress,
          streetAddressTwo,
          city,
          state,
          stateAbbreviation,
          zipCode,
        },
        lossTypes,
        serviceTypes,
      },
    };

    dispatch({
      type: "CREATE_ORGANIZATION",
      payload: newOrg,
    });
  };

  return (
    <form className="add_org">
      <AddOrgDetails
        setOrgName={setOrgName}
        setServiceExplanation={setServiceExplanation}
        setMission={setMission}
        setNotes={setNotes}
        setUrl={setUrl}
        setPhone={setPhone}
        setEmail={setEmail}
        setForProfit={setForProfit}
        setFaithBased={setFaithBased}
        setHasRetreatCenter={setHasRetreatCenter}
        setLinkedInUrl={setLinkedInUrl}
        setFacebookUrl={setFacebookUrl}
        setInstagramUrl={setInstagramUrl}
      />
      <AddOrgAddress
        setStreetAddress={setStreetAddress}
        setStreetAddressTwo={setStreetAddressTwo}
        setCity={setCity}
        setState={setState}
        setStateAbbreviation={setStateAbbreviation}
        setZipCode={setZipCode}
      />
      {/* <AddOrgOptions
        lossTypes={lossTypes}
        setLossTypes={setLossTypes}
        serviceTypes={serviceTypes}
        setServiceTypes={setServiceTypes}
      /> */}
      <AddOrgOptions />


      <Button variant="contained" color="primary" onClick={submit}>
        Add
      </Button>
    </form>
  );
};

export default AddOrgPage;
