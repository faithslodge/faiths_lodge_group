import { Box, Button, List, TextField } from "@mui/material";
import OptionListItem from "../../components/OptionListItem/OptionListItem";
import OptionsList from "../../components/OptionsList/OptionsList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OptionsPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type: "FETCH_LOSSES"});
        dispatch({type: "FETCH_SERVICES"});
    },[])

  return (
    <Box sx={{ width: "fit-content", display: "flex", flexDirection:"row", margin: "auto" }}>
      <OptionsList text="Type of Loss"/>
      <OptionsList text="Services" />
    </Box>
  );
};

export default OptionsPage;
