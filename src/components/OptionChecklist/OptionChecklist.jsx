import { Grid, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const OptionChecklist = () => {
    const [optionSelect, setOptionSelect] = useState([]);

    return (
        <>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Type of Loss:</FormLabel>
          <Button onClick={() => console.log(optionSelect)}>Log</Button>
          <FormGroup>
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
            <FormControlLabel
              control={
                <Checkbox
                  id="stillbirth"
                  name="optionSelect[]"
                  value="Stillbirth"
                  checked={optionSelect.includes("Stillbirth")}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setOptionSelect([...optionSelect, "Stillbirth"]);
                    } else {
                      setOptionSelect(optionSelect.filter((type) => type !== "Stillbirth"));
                    }
                  }}
                />
              }
              label="Stillbirth"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="Infant/Toddler Loss (0-3)"
                  name="optionSelect[]"
                  value="Infant/Toddler Loss (0-3)"
                  checked={optionSelect.includes("Infant/Toddler Loss (0-3)")}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setOptionSelect([...optionSelect, "Infant/Toddler Loss (0-3)"]);
                    } else {
                      setOptionSelect(optionSelect.filter((type) => type !== "Infant/Toddler Loss (0-3)"));
                    }
                  }}
                />
              }
              label="Infant/Toddler Loss (0-3)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="Child Loss"
                  name="optionSelect[]"
                  value="Child Loss"
                  checked={optionSelect.includes("Child Loss")}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setOptionSelect([...optionSelect, "Child Loss"]);
                    } else {
                      setOptionSelect(optionSelect.filter((type) => type !== "Child Loss"));
                    }
                  }}
                />
              }
              label="Child Loss"
            />
            <FormControlLabel
              control={
                <Checkbox id="Childhood Cancer/Medical Complex" name="optionSelect[]" value="Childhood Cancer/Medical Complex" />
              }
              label="Childhood Cancer/Medical Complex"
            />
          </FormGroup>
        </FormControl>
        </>
    )
}

export default OptionChecklist