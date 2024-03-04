import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";
import OptionsList from "../../components/OptionsList/OptionsList";

const OptionsPage = () => {
  return (
    <Box sx={{ width: "fit-content", display: "flex", flexDirection:"row", margin: "auto" }}>
      <OptionsList text="Type of Loss"/>
      <OptionsList text="Services" />
    </Box>
  );
};

export default OptionsPage;
