import { combineReducers } from "redux";

const orgInitialState = {
  name: "",
  serviceExplanation: "",
  logoId: null,
  mission: "",
  notes: "",
  url: "",
  phone: "",
  email: "",
  forProfit: false,
  faithBased: false,
  hasRetreatCenter: false,
  linkedInUrl: "",
  facebookUrl: "",
  instagramUrl: "",
};

const addressInitialState = {
  addressLineOne: "",
  addressLineTwo: "",
  city: "",
  state: "",
  stateAbbreviation: "",
  zipCode: "",
};

const contactInitialState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  title: "",
};

const org = (state = orgInitialState, action) => {
  switch (action.type) {
    case "SET_ORG_OBJECT":
      return { ...state, ...action.payload };
    case "SET_NEW_ORG_TO_INITAL":
      return orgInitialState;
    default:
      return state;
  }
};

const address = (state = addressInitialState, action) => {
  switch (action.type) {
    case "SET_ADDRESS_OBJECT":
      return { ...state, ...action.payload };
    case "SET_NEW_ORG_TO_INITAL":
      return addressInitialState;
    default:
      return state;
  }
};

const lossTypes = (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_LOSS":
      return action.payload;
    case "SET_NEW_ORG_TO_INITAL":
      return [];
    default:
      return state;
  }
};

const serviceTypes = (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_SERVICE":
      return action.payload;
    case "SET_NEW_ORG_TO_INITAL":
      return [];
    default:
      return state;
  }
};

const contacts = (state = [], action) => {
  switch (action.type) {
    case "COMPLETE_CONTACTS":
      return [action.payload];
    case "SET_NEW_ORG_TO_INITAL":
      return [];
    default:
      return state;
  }
};

const newContact = (state = contactInitialState, action) => {
  switch (action.type) {
    case "SET_NEW_CONTACT":
      return { ...state, ...action.payload };
    case "SET_NEW_ORG_TO_INITAL":
      return contactInitialState;
    default:
      return state;
  }
};

export default combineReducers({
  org,
  address,
  lossTypes,
  serviceTypes,
  contacts,
  newContact,
});
