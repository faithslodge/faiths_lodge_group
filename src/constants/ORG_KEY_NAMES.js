import PhoneNumberFormatter from "../utils/PhoneNumberFormatter/PhoneNumberFormatter";

// Array used to conditionally render and style different
// new org form inputs
const ORG_KEY_NAMES = [
    {
        text: "Organization Name",
        checkBox: false,
        keyName: "name",
        size: 5,
        variant: "standard",
        isRequired: true,
    },
    {
        text: "Website",
        checkBox: false,
        keyName: "url",
        size: 5,
        variant: "standard",
    },
    {
        text: "Logo",
        checkBox: false,
        keyName: "logoId",
        size: 2,
        variant: "standard",
    },
    {
        text: "Phone",
        checkBox: false,
        keyName: "phone",
        size: 5,
        variant: "standard",
        inputProps: { inputComponent: PhoneNumberFormatter },
    },
    {
        text: "Email",
        checkBox: false,
        keyName: "email",
        size: 5,
        variant: "standard",
    },
    {
        text: "Service Explanation",
        checkBox: false,
        keyName: "serviceExplanation",
        size: 6,
        rows: 3,
        variant: "outlined",
    },
    {
        text: "Mission",
        checkBox: false,
        keyName: "mission",
        size: 6,
        rows: 3,
        variant: "outlined",
    },
    {
        text: "Notes",
        checkBox: false,
        keyName: "notes",
        size: 12,
        rows: 3,
        variant: "outlined",
    },
    {
        text: "LinkedIn",
        checkBox: false,
        keyName: "linkedInUrl",
        size: 4,
        variant: "standard",
    },
    {
        text: "Facebook",
        checkBox: false,
        keyName: "facebookUrl",
        size: 4,
        variant: "standard",
    },
    {
        text: "Instagram",
        checkBox: false,
        keyName: "instagramUrl",
        size: 4,
        variant: "standard",
    },
    { text: "For Profit", checkBox: true, keyName: "forProfit" },
    { text: "Faith Based", checkBox: true, keyName: "faithBased" },
    { text: "Retreat Center", checkBox: true, keyName: "hasRetreatCenter" },
];

export default ORG_KEY_NAMES;