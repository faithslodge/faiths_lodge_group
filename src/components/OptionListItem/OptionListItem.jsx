import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

const OptionListItem = ({ text }) => {
  const [editView, setEditView] = useState(false);
  const [newInput, setInput] = useState(text);

  const handleEdit = () => {
    editView ? setEditView(false) : setEditView(true);
    setInput(text);
  };

  const handleSave = () => {
    editView ? setEditView(false) : setEditView(true);
    console.log(newInput);
  };

  return (
    <ListItem sx={{ width: "auto" }}>
      {editView ? (
        <>
          <TextField size="small" value={newInput} onChange={(event) => setInput(event.target.value)} />
          <Button color="success" onClick={handleSave}>
            <SaveIcon />
          </Button>
          <Button onClick={handleEdit} color="error">
            <CancelIcon />
          </Button>
        </>
      ) : (
        <>
          <ListItemText primary={text} />
          <Button onClick={handleEdit}>
            <EditIcon />
          </Button>
        </>
      )}
    </ListItem>
  );
};

export default OptionListItem;
