import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

const PhoneNumberFormatter = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  // console.log("PROPS",props)
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
      overwrite
    />
  );
});

// PhoneNumberFormatter.propTypes = {
//   id: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default PhoneNumberFormatter;
