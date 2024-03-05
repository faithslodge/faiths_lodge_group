import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";

const OptionsList = ({text, options}) => {
  return (
    <Box sx={{ width: "fit-content", display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center", p:5 }}>
      <Box sx={{display: "flex", p: 1}}>
        <TextField size="small" label={text}/>
        <Button variant="contained">＋</Button>
      </Box>

      <Box sx={{border: "1px solid black", borderRadius: 3}}>
        <List >
          {options?.map(option => (
            <OptionListItem text={option?.name} key={option?.id} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default OptionsList;