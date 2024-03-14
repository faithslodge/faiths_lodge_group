import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, Button, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import UserRowItem from "../../components/UserRowItem/UserRowItem";


const AdminPage = () => {
  const users = useSelector((store) => store?.allUsers);

  return (
    <TableContainer component={Paper} sx={{ width: "max-content", m: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Is Admin</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <UserRowItem row={row} key={row.id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminPage;
