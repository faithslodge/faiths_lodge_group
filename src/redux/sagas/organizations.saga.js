
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// fetch org data from org router
function* fetchOrganizations() {
   try {
      const response = yield axios.get("/api/organization");
      console.log("FETCH ORG response data:", response.data);
      yield put({ type: "SET_ORGANIZATIONS", payload: response.data });
   } catch (error) {
      console.log("Organizations GET request failed:", error);
   }
}


function* createOrganizations(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.post('/api/patient', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_ORGANIZATION' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* editOrganizations(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.put('/api/patient', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_ORGANIZATION' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* organizationsSaga() {
   yield takeLatest("FETCH_ORGANIZATIONS", fetchOrganizations);
   yield takeLatest("CREATE_ORGANIZATION", createOrganizations);
   yield takeLatest("EDIT_ORGANIZATION", editOrganizations);
}

export default organizationsSaga;
