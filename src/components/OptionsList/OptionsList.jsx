import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";
import { useState } from "react";
import { useDispatch } from "react-redux";


// options prop is the store values passed into OptionsList
  // could be Type of Loss or Services
const OptionsList = ({ text, options, keyText }) => {
  const [textInput, setInput] = useState(""); 
  const dispatch = useDispatch();
  const path = keyText.toUpperCase()

  const handleAdd = () => {
    dispatch({type: `ADD_${path}`, payload: {[keyText] : textInput}});
    setInput("");
  };

  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
      }}
    >
      <Box sx={{ display: "flex", p: 1 }}>
        <TextField size="small" sx={{width: 250}} label={text} value={textInput} onChange={(event) => setInput(event.target.value)} />

        <Button variant="contained" onClick={handleAdd}>
          ＋
        </Button>
      </Box>

      <Box sx={{ border: "1px solid black", borderRadius: 3 }}>
        <List>
          {options?.map((option) => (
            <OptionListItem text={option?.name} id={option?.id} key={option?.id} path={path}/>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default OptionsList;
