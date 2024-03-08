import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import US_STATES from '../../../constants/US_STATES'

export default function StateSelector() {
  return (
    <FormControl>
      <FormLabel>State</FormLabel>
      <Autocomplete
        autoHighlight
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name || ""}
        options={US_STATES}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            {option.name}
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}
