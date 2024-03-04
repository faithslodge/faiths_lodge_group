import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";

const OptionsList = ({text}) => {
  return (
    <Box sx={{ width: "fit-content", display: "flex", flexDirection:"column", justifyContent: "center", p:5 }}>
      <Box sx={{display: "flex", p: 1}}>
        <TextField size="small" label={text}/>
        <Button variant="contained">＋</Button>
      </Box>

      <Box sx={{border: "1px solid black", borderRadius: 3}}>
        <List>
          <OptionListItem text="Item 1" />
          <OptionListItem text="Item 2" />
          <OptionListItem text="Item 3" />
        </List>
      </Box>
    </Box>
  );
};

export default OptionsList;