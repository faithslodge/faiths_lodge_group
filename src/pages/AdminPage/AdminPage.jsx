import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import UserRowItem from "../../components/UserRowItem/UserRowItem";
import { Box } from "@mui/system";

const AdminPage = () => {
  const dispatch = useDispatch();

  const users = useSelector((store) => store?.allUsers);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
    
  };

  return (
    <>
      <center>
        <Typography variant="h4" component="h2" pt={5} gutterBottom>
          Admin
        </Typography>
      </center>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ m: 5 }}>
          <Typography sx={{ m: 2 }}>Add New User</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              label="Username"
              size="small"
              autoComplete="off"
              value={username}
              sx={{ m: 2 }}
              required
              onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="off"
              size="small"
              value={password}
              sx={{ m: 2 }}
              required
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button sx={{ m: 2 }} variant="contained" onClick={registerUser}>
              Register
            </Button>
          </Box>
        </Box>

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
                <UserRowItem row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminPage;
