//
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
import AddOrg from "../../components/AddOrg/AddOrg";
import AddOrgService from "../../components/AddOrgService/AddOrgService";
import AddOrgAddresses from "../../components/AddOrgAddress/AddOrgAddress";

const AddOrgPage = () => {

  return (
    <>
      <AddOrg />
      <AddOrgAddresses />
      <AddOrgService />
    </>
  );
};

export default AddOrgPage;
