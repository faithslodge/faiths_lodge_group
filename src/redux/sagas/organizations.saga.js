
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

const handleError = (error) => {
   alert("Organizations GET request failed:", error);
}

// fetch org data from org router
function* fetchOrganizations() {
   try {
      const response = yield axios.get("/api/organization");
      console.log("FETCH ORG response data:", response.data);
      yield put({ type: "SET_ORGANIZATIONS", payload: response.data });
   } catch (error) {
      handleError(error)
   }
}


function* createOrganizations(action) {
   try {
      const { organizationDetails } = action.payload;
      const logoPostRes = yield axios.post('/api/logo', action.payload.formWithLogo);
      console.log("the returned json:", logoPostRes.data.id);
      const logoId = logoPostRes.data.id;
      const newOrganizationDetails = {organizationDetails: {...organizationDetails }};
      delete newOrganizationDetails.formWithLogo;
      yield axios.post('/api/organization', {...newOrganizationDetails, logoId: logoId});
      yield put({ type: 'FETCH_ORGANIZATIONS' });
   } catch (error) {
      handleError(error)
   }
}

function* editOrganizations(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.put('/api/patient', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_ORGANIZATION' });


   } catch (error) {
      handleError(error)
   }
}

function* organizationsSaga() {
   yield takeLatest("FETCH_ORGANIZATIONS", fetchOrganizations);
   yield takeLatest("CREATE_ORGANIZATION", createOrganizations);
   yield takeLatest("EDIT_ORGANIZATION", editOrganizations);
}

export default organizationsSaga;
