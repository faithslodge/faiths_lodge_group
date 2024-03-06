import { Grid, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const OptionChecklist = () => {
    const [optionSelect, setOptionSelect] = useState([]);

    return (
        <>
            <FormControlLabel
              control={
                <Checkbox
                  id="earlyPregnancy"
                  name="optionSelect[]"
                  value="Early Pregnancy"
                  checked={optionSelect.includes("Early Pregnancy")}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setOptionSelect([...optionSelect, "Early Pregnancy"]);
                    } else {
                      setOptionSelect(optionSelect.filter((type) => type !== "Early Pregnancy"));
                    }
                  }}
                />
              }
              label="Early Pregnancy"
            />

        </>
    )
}

export default OptionChecklist