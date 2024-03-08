import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const AddContactOrg = ({ contact, handleChange }) => {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            value={contact.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddContactOrg;