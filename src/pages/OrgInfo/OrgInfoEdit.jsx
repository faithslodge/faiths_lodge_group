import * as React from "react";
import {
  Modal,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Link,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Card,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Email, OpenInNew, Phone } from "@mui/icons-material";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import PhoneNumberFormatter from "../../utils/PhoneNumberFormatter/PhoneNubmerFormatter";
import { forwardRef } from "react";

// Font
const overlineFont = {
  fontSize: 14,
  color: "rgba(92, 118, 55, 1)",
};

// Drop Down Menu Styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const boolCheck = (info) => {
  if (info === null) {
    return "";
  } else if (info === true) {
    return "Yes";
  } else if (info === false) {
    return "No";
  }
};

// ! filter the service/loss types in the local state
// compare to the store values, return the store ids for the type in an array
const fetchTypeIds = (storeTypeArr, stateTypeArr) => {
  const filteredIds = [];
  // console.log("storeTypeArr:", storeTypeArr);
  // console.log("stateTypeArr:", stateTypeArr);
  for (let storeType of storeTypeArr) {
    for (let stateType of stateTypeArr) {
      if (stateType === storeType.name) {
        filteredIds.push(storeType.id);
      }
    }
  }
  // console.log("FilteredIds:", filteredIds);
  return filteredIds;
};

const OrgInfoEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // ! Fetch the Organization from the reducer by ID
  const { id } = useParams();
  // console.log("ParamID:", id);
  const orgStore = useSelector((store) => store.organizations);
  // console.log("orgStore:", orgStore);
  const filteredOrgArray = orgStore?.filter((item) => item.id === Number(id));
  // console.log("filteredOrgArray:", filteredOrgArray);
  let org = filteredOrgArray[0];
  console.log("org:", org);

  const [editOrg, setEditOrg] = useState(org);
  console.log("EDIT ORG:", editOrg);

  // ! HANDLECHANGE()
  // handle string value changes
  const handleChange = (e) => {
    // console.log("e.target", e.target)
    // console.log("e.target.id", e.target.id)
    // console.log("e.target.value", e.target.value)
    let keyName = e.target.id;
    let value = e.target.value;
    setEditOrg({ ...editOrg, [keyName]: value });
    // dispatch({type: "EDIT_ORG", payload: { [keyName]: value}})
  };

  // handleBoolean dropdown changes
  const handleBooleanChange = (e) => {
    // console.log("e.target", e.target)
    // console.log("e.target.name", e.target.name)
    // console.log("e.target.value", e.target.value)
    let keyName = e.target.name;
    let value = e.target.value;
    setEditOrg({ ...editOrg, [keyName]: value });
    // dispatch({type: "EDIT_ORG", payload: { [keyName]: value}})
  };

  // ! Loss Types
  // previous types for rendering dropdown checkboxes checked if the type was previously selected
  const previousLossTypes = org?.agg_loss_type.map((type) => type?.name);
  // console.log("previousLossTypes:", previousLossTypes);

  // get all possible types from the reducer to render available types to select
  const storeLossTypes = useSelector((store) => store?.options.lossesReducer);
  // console.log("storeLossTypes:", storeLossTypes);

  // map just the type names to render in the dropdown
  const lossTypeNames = storeLossTypes?.map((type) => type?.name);
  // console.log("lossTypeNames:", lossTypeNames);

  // local state to set currently checked types
  const [stateLossTypes, setStateLossTypes] = useState(previousLossTypes);
  // console.log("stateLossTypes:", stateLossTypes);

  // onchange, set the local state to the current value of the dropdown (array)
  const handleLossTypeChange = (event) => {
    setStateLossTypes(event.target.value);
    // console.log("Loss type change event:", event);
  };
  // console.log("stateLossTypes:", stateLossTypes);

  // ! Services Types
  // previous types for rendering dropdown checkboxes checked if the type was previously selected
  const previousServiceTypes = org?.agg_service_type.map((type) => type?.name);
  // console.log("previousServiceTypes:", previousServiceTypes);

  // get all possible types from the reducer to render available types to select
  const storeServiceTypes = useSelector(
    (store) => store?.options.servicesReducer
  );
  // console.log("storeServiceTypes:", storeServiceTypes);

  // map just the type names to render in the dropdown
  const serviceTypeNames = storeServiceTypes?.map((type) => type.name);
  // console.log("serviceTypeNames:", serviceTypeNames);

  // local state to set currently checked types
  const [stateServiceTypes, setStateServiceTypes] =
    useState(previousServiceTypes);
  // console.log("stateServiceTypes:", stateServiceTypes);

  // onchange, set the local state to the current value of the dropdown (array)
  const handleServiceTypeChange = (event) => {
    setStateServiceTypes(event.target.value);
    // console.log("Service type change event:", event);
  };
  // console.log("stateServiceTypes:", stateServiceTypes);

  // ! Contacts
  const [stateContacts, setStateContacts] = useState(org?.agg_contacts);
  console.log("stateContacts:", stateContacts);

  const handleContactChange = (e) => {
    // console.log("e.target", e.target);
    // console.log("e.target.name", target.name);
    // console.log("e.target.id", e.target.id)
    // console.log("e.target.value", e.target.value)

    let id = e.target.id;
    let keyName = e.target.name;
    let value = e.target.value;

    setStateContacts(stateContacts =>
      stateContacts.map(contact =>
          contact.id === Number(id) ? {...contact, [keyName]: value} : contact
        )
    )
    
  };

  // ! Dispatch Edits
  // dispatch edited org info in correct format
  // payload = {{org}, {address}, [lossType (ids)], [serviceType (ids)], [{contacts}]}
  const handleSave = () => {
    const org = {
      // dateVerified: editOrg.date_verified,
      email: editOrg.email,
      facebookUrl: editOrg.facebook_url,
      faithBased: editOrg.faith_based,
      forProfit: editOrg.for_profit,
      hasRetreatCenter: editOrg.has_retreat_center,
      id: editOrg.id,
      instagramUrl: editOrg.instagram_url,
      linkedInUrl: editOrg.linked_in_url,
      logo: editOrg.logo,
      mission: editOrg.mission,
      name: editOrg.name,
      notes: editOrg.notes,
      phone: editOrg.phone,
      serviceExplanation: editOrg.service_explanation,
      url: editOrg.url,
      // verifiedBy: editOrg.verified_by,
    };
    const address = {
      addressLineOne: editOrg.address_line_1,
      addressLineTwo: editOrg.address_line_2,
      city: editOrg.city,
      state: editOrg.state,
      stateAbbreviation: editOrg.state_abbreviation,
      zipCode: editOrg.zip_code,
      latitude: editOrg.latitude,
      longitude: editOrg.longitude,
    };
    const lossTypes = fetchTypeIds(storeLossTypes, stateLossTypes);
    const serviceTypes = fetchTypeIds(storeServiceTypes, stateServiceTypes);
    const contacts = editOrg.agg_contacts;
    let payload = {
      updateOrg: {
        org,
        address,
        lossTypes,
        serviceTypes,
        contacts,
      },
    };
    console.log("PAYLOAD:", payload);
    dispatch({ type: "EDIT_ORG_UPDATE", payload: payload });
    history.push("/map");
  };

  // ! RENDER
  return (
    <Container>
      <Grid container>
        {/* Left */}
        <Grid item xs={6}>
          {/* TITLE: ORG NAME */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Organization Name</b>
          </Typography>

          <br />

          {/* Org Name, Verified Badge, View/Edit Btn */}
          <Stack direction="row" alignItems="center" gap={2}>
            <TextField
              fullWidth
              id="name"
              label="Organization Name"
              defaultValue={org?.name}
              variant="standard"
              onChange={handleChange}
            />

            {org?.verified_by && (
              <Stack spacing={1} direction="row" alignItems="center" ml={1}>
                <Typography
                  variant="caption"
                  fontStyle="italic"
                  sx={{ fontSize: 14, color: "rgba(217, 144, 33, 1)" }}
                >
                  Verified
                </Typography>
                <VerifiedIcon
                  fontSize="medium"
                  sx={{ color: "rgba(217, 144, 33, 1)" }}
                />
              </Stack>
            )}

            <Button
              variant="outlined"
              onClick={handleSave}
              sx={{ fontSize: "medium", ml: 5 }}
            >
              Save
            </Button>
          </Stack>

          <br />
        </Grid>
      </Grid>

      <Grid container pt={4}>
        <Grid item xs={6} pr={5}>
          {/* TITLE: Org Info */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Organization Info</b>
          </Typography>

          <br />
          <br />

          {/* Address 1 & 2 */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="standard-helperText"
              key="address_line_1"
              variant="standard"
              label="Address Line 1"
              fullWidth
              defaultValue={org?.address_line_1}
              onChange={handleChange}
            />
            <TextField
              id="address_line_2"
              variant="standard"
              label="Address Line 2"
              fullWidth
              defaultValue={org?.address_line_2}
              onChange={handleChange}
            />
          </Stack>

          <br />

          {/* City State Zip */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="city"
              variant="standard"
              label="City"
              fullWidth
              defaultValue={org?.city}
              onChange={handleChange}
            />
            <TextField
              id="state"
              variant="standard"
              label="State"
              fullWidth
              defaultValue={org?.state}
              onChange={handleChange}
            />
          </Stack>

          <br />

          {/* Zip & Phone */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="zip"
              variant="standard"
              fullWidth
              label="Zip"
              defaultValue={org?.zip}
              onChange={handleChange}
            />

            <TextField
              id="phone"
              variant="standard"
              label="Phone"
              fullWidth
              defaultValue={org?.phone}
              onChange={handleChange}
              InputProps={{
                inputComponent: PhoneNumberFormatter,
              }}
            />
          </Stack>

          <br />

          {/* Email & Website */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="email"
              variant="standard"
              label="Email"
              fullWidth
              defaultValue={org?.email}
              onChange={handleChange}
            />
            <TextField
              id="url"
              variant="standard"
              label="Website"
              fullWidth
              defaultValue={org?.url}
              onChange={handleChange}
            />
          </Stack>

          <br />
          <br />

          {/* Retreat?, Faith Based?, For Profit? */}
          <Stack direction="row" alignItems="center" gap={1}>
            <FormControl fullWidth>
              <InputLabel id="has_retreat_center_selector">
                Has Retreat?
              </InputLabel>
              <Select
                labelId="has_retreat_center_selector"
                name="has_retreat_center"
                value={editOrg?.has_retreat_center}
                label="Has Retreat?"
                onChange={handleBooleanChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="faith_based_selector">Faith Based?</InputLabel>
              <Select
                labelId="faith_based_selector"
                name="faith_based"
                value={editOrg?.faith_based}
                label="Faith Based?"
                onChange={handleBooleanChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="for_profit_selector">For Profit?</InputLabel>
              <Select
                labelId="for_profit_selector"
                name="for_profit"
                value={editOrg?.for_profit}
                label="For Profit?"
                onChange={handleBooleanChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <br />
          <br />

          {/* Mission */}
          <TextField
            id="mission"
            label="Mission"
            fullWidth
            multiline
            rows={4}
            defaultValue={org?.mission}
            onChange={handleChange}
          />

          <br />
          <br />

          <TextField
            id="service_explanation"
            label="Service Explanation"
            fullWidth
            multiline
            rows={6}
            defaultValue={org?.service_explanation}
            onChange={handleChange}
          />
        </Grid>

        {/* Right Side */}

        <Grid item xs={6} pl={5}>
          {/* Notes */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Notes</b>
          </Typography>

          <br />
          <br />

          <TextField
            id="notes"
            label="Notes"
            fullWidth
            multiline
            rows={6}
            defaultValue={org?.notes}
            onChange={handleChange}
          />

          <br />
          <br />
          <br />

          {/* Type of Loss and Services */}
          <Stack direction={{ xs: "column", xl: "row" }} gap={{ xs: 2, xl: 4 }}>
            {/* Type of Loss */}
            <Stack direction="column" gap={1}>
              <Typography variant="overline" sx={overlineFont}>
                <b>Type of Loss</b>
              </Typography>

              <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Type of Loss
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={stateLossTypes}
                  onChange={handleLossTypeChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {lossTypeNames.map((type, i) => (
                    <MenuItem value={type} key={i}>
                      <Checkbox checked={stateLossTypes?.includes(type)} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Service Types */}
            <Stack direction="column" gap={1}>
              <Typography variant="overline" sx={overlineFont}>
                <b>Services</b>
              </Typography>

              <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Service Types
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={stateServiceTypes}
                  onChange={handleServiceTypeChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {serviceTypeNames.map((type, i) => (
                    <MenuItem value={type} key={i}>
                      <Checkbox checked={stateServiceTypes?.includes(type)} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <br />

          {/* Social Media */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Social Media</b>
          </Typography>

          <br />

          <Stack direction="column" alignItems="left" gap={3} width="70%">
            <TextField
              id="facebook_url"
              variant="standard"
              fullWidth
              label="Facebook"
              defaultValue={org?.facebook_url}
              onChange={handleChange}
            />

            <TextField
              id="instagram_url"
              variant="standard"
              fullWidth
              label="Instagram"
              defaultValue={org?.instagram_url}
              onChange={handleChange}
            />

            <TextField
              id="linked_in_url"
              variant="standard"
              label="LinkedIn"
              defaultValue={org?.linked_in_url}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Point of Contact */}
      <Grid container pt={5} rowGap={3} justifyContent="space-between">
        <Grid item xs={12}>
          <Typography variant="overline" sx={overlineFont}>
            <b>POINTS OF CONTACT</b>
          </Typography>
        </Grid>

        {/* Map Contacts */}
        {org?.agg_contacts &&
          org?.agg_contacts?.map((contact, i) => (
            <Grid
              item
              key={i}
              xs={5.5}
              sx={{
                boxShadow: 2,
                border: "0.5px solid black",
                borderRadius: 1,
                p: 3,
              }}
            >
              <Stack direction="row" alignItems="center" gap={3}>
                <TextField
                  id={`${contact.id}`}
                  name="firstName"
                  variant="standard"
                  fullWidth
                  label="First Name"
                  defaultValue={contact.firstName}
                  onChange={handleContactChange}
                />

                <TextField
                  id={`${contact.id}`}
                  name="lastName"
                  variant="standard"
                  fullWidth
                  label="Last Name"
                  defaultValue={contact.lastName}
                  onChange={handleContactChange}
                />

                <TextField
                  id={`${contact.id}`}
                  name="title"
                  variant="standard"
                  fullWidth
                  label="Title"
                  defaultValue={contact.title}
                  onChange={handleContactChange}
                />
              </Stack>

              <br />

              <Stack direction="row" alignItems="center" gap={3}>
                <TextField
                  id={`${contact.id}`}
                  name="phone"
                  variant="standard"
                  fullWidth
                  label="Phone"
                  defaultValue={contact.phone}
                  onChange={handleContactChange}
                />
                <TextField
                  id={`${contact.id}`}
                  name="email"
                  variant="standard"
                  fullWidth
                  label="Email"
                  defaultValue={contact.email}
                  onChange={handleContactChange}
                />
              </Stack>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default OrgInfoEdit;
