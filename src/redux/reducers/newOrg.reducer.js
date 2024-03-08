import { combineReducers } from "redux";

const orgInitialState = {
    name: "",
    serviceExplanation: "",
    logo: null,        
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
    instagramUrl: ""
}

const newOrgReducer = (state = orgInitialState, action) => {
    switch (action.type) {
        case "SET_ORG_OBJECT":
            return {...state, ...action.payload}
        default:
            return state
    }
}

const newAddressReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ADDRESS_OBJECT":
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    newOrgReducer,
    newAddressReducer
  });