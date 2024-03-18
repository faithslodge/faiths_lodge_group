import React, { useState } from "react";
import { TableCell, TableRow, Select, Button, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

const UserRowItem = ({ row }) => {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(row.is_admin);

  const dispatch = useDispatch()

  const handleEdit = (event) => {
    console.log(event.target.id);
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const handleChange = (event) => {
    setIsAdmin(event.target.value);
  };

  const handleSave = (event) => {
    console.log(event.target.id, isAdmin);
    dispatch({type: "EDIT_USER_IS_ADMIN", payload: {
      userId: event.target.id,
      isAdmin: isAdmin
    }})
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const handleDelete = (event) => {
    dispatch({type: "DELETE_USER", payload: {userId: event.target.id}});
  };

  return (
    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="left">{row.username}</TableCell>
      {editMode === false ? (
        <TableCell align="left">{isAdmin ? <>Yes</> : <>No</>}</TableCell>
      ) : (
        <TableCell align="left">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isAdmin}
              label="Admin"
              onChange={handleChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      )}
      {editMode === false ? (
        <TableCell align="center">
          <Button id={row.id} onClick={handleEdit}>
            Edit
          </Button>
        </TableCell>
      ) : (
        <TableCell align="center">
          <Button id={row.id} onClick={handleSave}>
            Save
          </Button>
        </TableCell>
      )}
      <TableCell align="center">
        <Button id={row.id} onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRowItem;
