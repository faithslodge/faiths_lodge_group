import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useDispatch } from "react-redux";

const OptionListItem = ({ text, id, path }) => {
  const [editView, setEditView] = useState(false);
  const [newInput, setInput] = useState(text);

  const dispatch = useDispatch();

  // convert path to lowerCase
  const keyText = path.toLowerCase();

  // handleEdit handles both Edit and Cancel. It will change which buttons are visible
  // and setInput to default
  const handleEdit = () => {
    editView ? setEditView(false) : setEditView(true);
    setInput(text);
  };

  // handle Save will reset editView to false and dispatch a payload with ID and input text with Key for specific path (loss or service)
  const handleSave = () => {
    setEditView(false);
    dispatch({
      type: `UPDATE_${path}`,
      payload: {
        id: id,
        [keyText]: newInput,
      },
    });
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
