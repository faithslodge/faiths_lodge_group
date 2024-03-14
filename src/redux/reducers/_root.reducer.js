import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import options from './options.reducer';
import organizations from './organizations.reducer';
import filters from './filter.reducer';
import newOrg from './newOrg.reducer';
import editOrg from './editOrg.reducer';
import newLogoReducer from './logo.reducer';
import allUsers from './allUsers.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  options, // contains type of loss and services provided for forms/selection menus
  organizations,
  filters,
  newOrg,
  editOrg,
  newLogoReducer,
  allUsers
});

export default rootReducer;
