import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const OptionCheckMenu = ({ options, optTypes, setOptTypes, text }) => {
  // const [optionSelect, setOptionSelect] = useState([]);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Type of {text}:</FormLabel>
        <FormGroup>
          {options?.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  id={`${option?.id}`}
                  value={option?.name}
                  checked={optTypes?.includes(option?.id)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setOptTypes([...optTypes, option?.id]);
                    } else {
                      setOptTypes(optTypes?.filter((type) => type !== option?.id));
                    }
                  }}
                />
              }
              label={option?.name}
              key={option?.id}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
};

export default OptionCheckMenu;
