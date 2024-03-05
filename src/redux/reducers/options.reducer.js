import { combineReducers } from "redux";

// Reducer to store types of losses
const lossesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LOSSES":
      return action.payload;
    default:
      return state;
  }
};

// Reducer to store types of services
const servicesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SERVICES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  lossesReducer,
  servicesReducer,
});
