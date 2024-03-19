import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search({ }) {
  const storeOrgs = useSelector((store) => store.organizations);

  const dispatch = useDispatch();

  const searchFunction = (arg) => {
    const newList = storeOrgs.filter((org) => {
      return arg.toLowerCase() === "" ? org : org.name.toLowerCase().includes(arg) || org.state.toLowerCase().includes(arg);
    });
    dispatch({type: "SET_FILTER_ORGS", payload: newList});
  };

  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl
          onChange={(e) => {
            searchFunction(e.target.value);
          }}
          sx={{ flex: 1 }}
        >
          <Input placeholder="Search by Organization Name" startDecorator={<SearchRoundedIcon />} aria-label="Search" />
        </FormControl>
        <Button variant="solid" onClick={searchFunction} sx={{bgcolor: "#658149", ":hover":{bgcolor: "#688948"}}}>
          Search
        </Button>
      </Stack>
    </div>
  );
}
