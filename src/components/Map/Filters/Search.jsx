import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

export default function Search({ search, setSearch, searchFunction }) {
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl
          onChange={(e) => {
            setSearch(e.target.value);
            searchFunction();
          }}
          sx={{ flex: 1 }}
        >
          <Input placeholder="Search by Organization Name" startDecorator={<SearchRoundedIcon />} aria-label="Search" />
        </FormControl>
        <Button variant="solid" color="primary" onClick={searchFunction}>
          Search
        </Button>
      </Stack>
    </div>
  );
}
