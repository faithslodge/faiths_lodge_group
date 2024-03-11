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



const OrgInfoEdit = () => {
  const dispatch = useDispatch()

  // ! Fetch the Organization from the reducer by ID
  const { id } = useParams();
  console.log("ParamID:", id);

    const orgStore = useSelector((store) => store.organizations);
    console.log("orgStore:", orgStore);

    const filteredOrgArray = orgStore?.filter((item) => item.id === Number(id));
    console.log("filteredOrgArray:", filteredOrgArray);

    let org = filteredOrgArray[0];

    const [editOrg, setEditOrg] = useState(org)

    // ! HANDLECHANGE()
    const handleChange = (e) => {
      // console.log("e.target.id", e.target.id)
      // console.log("e.target.value", e.target.value)
      let keyName = e.target.id
      let value = e.target.value
      setEditOrg({...editOrg, [keyName]: value})
      // dispatch({type: "EDIT_ORG", payload: { [keyName]: value}})
    }
    console.log('editOrg', editOrg);

  // ! Loss Types
  const lossTypes = useSelector((store) => store.options.lossesReducer);
  console.log("lossTypes:", lossTypes);


    const [stateLossTypes, setStateLossTypes] = useState([]);

    const handleLossTypeChange = (event) => {
      const {
        target: { value },
      } = event;
      setStateLossTypes(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    console.log("stateLossTypes:", stateLossTypes);

  // ! Services Types
  const serviceTypes = useSelector((store) => store.options.servicesReducer);
  console.log("serviceTypes:", serviceTypes);

    const [stateServiceTypes, setStateServiceTypes] = useState([]);

    const handleServiceTypeChange = (event) => {
      const {
        target: { value },
      } = event;
      setStateServiceTypes(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    console.log("stateServiceTypes:", stateServiceTypes);

    // ! 
  

  return (
    <Container>
      {/* Modal Info Container */}

      <Grid container>
        {/* Left */}
        <Grid item xs={6} pr={5}>
          {/* Org Name, Verified Badge, View/Edit Btn */}
          <Button variant="contained" color="success" onClick={handleChange}>TEST</Button><br />
          <Typography variant="overline" sx={overlineFont}>
            <b>Organization Name</b>
          </Typography>

          <br />

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

            <Button variant="text" sx={{ fontSize: "medium", ml: 5 }}>
              Save
            </Button>
          </Stack>

          <br />

          {/* Section Title: Org Info */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Organization Info</b>
          </Typography>

          <br />
          <br />

          {/* Mission */}
          <TextField
            id="outlined-multiline-static"
            label="Mission"
            fullWidth
            multiline
            rows={4}
            defaultValue={org?.mission}
          />

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
            />
            <TextField
              id="standard-helperText"
              variant="standard"
              label="Address Line 2"
              fullWidth
              defaultValue={org?.address_line_2}
            />
          </Stack>

          <br />

          {/* City State Zip */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="standard-helperText"
              variant="standard"
              label="City"
              fullWidth
              defaultValue={org?.city}
            />
            <TextField
              id="standard-helperText"
              variant="standard"
              label="State"
              fullWidth
              defaultValue={org?.state}
            />
          </Stack>

          <br />

          {/* Zip & Phone */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="standard-helperText"
              variant="standard"
              fullWidth
              label="Zip"
              defaultValue={org?.zip}
            />

            <TextField
              id="standard-helperText"
              variant="standard"
              label="Phone"
              fullWidth
              defaultValue={org?.phone}
            />
          </Stack>

          <br />

          {/* Email & Website */}
          <Stack direction="row" alignItems="center" gap={3}>
            <TextField
              id="standard-helperText"
              variant="standard"
              label="Email"
              fullWidth
              defaultValue={org?.email}
            />
            <TextField
              id="standard-helperText"
              variant="standard"
              label="Website"
              fullWidth
              defaultValue={org?.url}
            />
          </Stack>

          <br />
          <br />

          {/* Retreat?, Faith Based?, For Profit? */}
          <Stack direction="row" alignItems="center" gap={1}>
            <b>Has Retreat?:</b> {boolCheck(org?.has_retreat_center)}
            <b>Faith Based?:</b> {boolCheck(org?.faith_based)}
            <b>For Profit?:</b> {boolCheck(org?.for_profit)}
          </Stack>

          <br />
          <br />

          {/* Notes */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Notes</b>
          </Typography>

          <br />
          <br />

          <TextField
            id="outlined-multiline-static"
            label="Notes"
            fullWidth
            multiline
            rows={8}
            defaultValue={org?.notes}
          />
        </Grid>

        {/* Right Side */}
        <Grid item xs={6} pl={5}>
          {/* Stack to place Type of Loss and Services side-by-side */}
          <Stack direction="row" alignItems="top" gap={5}>
            {/* Type of Loss */}
            <div>
              <Typography variant="overline" sx={overlineFont}>
                <b>Type of Loss</b>
              </Typography>

              {/* <Typography variant="body2" component="ul" pl={2}>
                {org?.agg_loss_type &&
                  org?.agg_loss_type?.map((losstype) => (
                    <li key={losstype.id}>{losstype.name}</li>
                  ))}
              </Typography> */}

              <FormControl sx={{ m: 1, width: 300 }}>
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
                  {lossTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      <Checkbox
                        checked={stateLossTypes.indexOf(type.name) > -1}
                      />
                      <ListItemText primary={type.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Service Types */}
            <div>
              <Typography variant="overline" sx={overlineFont}>
                <b>Services</b>
              </Typography>
              {/* <Typography variant="body2" component="ul" pl={2}>
                {org?.agg_service_type &&
                  org?.agg_service_type?.map((service) => (
                    <li key={service.id}>{service.name}</li>
                  ))}
              </Typography> */}

              <FormControl sx={{ m: 1, width: 300 }}>
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
                  {serviceTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      <Checkbox
                        checked={stateServiceTypes.indexOf(type.name) > -1}
                      />
                      <ListItemText primary={type.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Stack>

          <br />
          <br />

          {/* Point of Contact */}
          <Typography variant="overline" sx={overlineFont}>
            <b>POINTS OF CONTACT</b>
          </Typography>

          <br />

          {/* Map Contacts */}
          {org?.agg_contacts &&
            org?.agg_contacts?.map((contact) => (
              <div key={contact.id}>
                {/* Name & Title */}
                <Stack direction="row" alignItems="center" gap={3}>
                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    fullWidth
                    label="First Name"
                    defaultValue={contact.firstName}
                  />

                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    fullWidth
                    label="Last Name"
                    defaultValue={contact.lastName}
                  />

                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    fullWidth
                    label="Title"
                    defaultValue={contact.title}
                  />
                </Stack>

                <br />

                {/* Phone & Email */}
                <Stack direction="row" alignItems="center" gap={3}>
                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    fullWidth
                    label="Phone"
                    defaultValue={contact.phone}
                  />
                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    fullWidth
                    label="Email"
                    defaultValue={contact.email}
                  />
                </Stack>
                <br />
                <br />
              </div>
            ))}

          <br />

          {/* Social Media */}
          <Typography variant="overline" sx={overlineFont}>
            <b>Social Media</b>
          </Typography>

          <br />

          <Stack direction="column" alignItems="left" gap={3} width="70%">
            <TextField
              id="standard-helperText"
              variant="standard"
              fullWidth
              label="Facebook"
              defaultValue={org?.facebook_url}
            />

            <TextField
              id="standard-helperText"
              variant="standard"
              fullWidth
              label="Instagram"
              defaultValue={org?.instagram_url}
            />

            <TextField
              id="standard-helperText"
              variant="standard"
              label="LinkedIn"
              defaultValue={org?.linked_in_url}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrgInfoEdit;
