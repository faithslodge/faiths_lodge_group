import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import PhoneNumberFormatter from '../../utils/PhoneNumberFormatter/PhoneNubmerFormatter';
import { useDispatch, useSelector } from 'react-redux';

// const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="(#00) 000-0000"
//       definitions={{
//         '#': /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

// TextMaskCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };


export default function FormattedInputs() {
    const org = useSelector(store => store.newOrg.org)
    const dispatch = useDispatch()
  const [values, setValues] = useState({
    textmask: '(100) 000-0000',
  });

  const handleChange = (event) => {
    dispatch({type: "SET_ORG_OBJECT", payload: {phone: event.target.value}})
  };

  return (
    <Stack direction="row" spacing={2}>
      <FormControl variant="standard">
        {/* <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel> */}
        <Input
          value={org?.phone}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={PhoneNumberFormatter}
        />
      </FormControl>
    </Stack>
  );
}
