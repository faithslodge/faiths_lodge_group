
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchOrganization() {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
         withCredentials: true,
      };
      const response = yield axios.get("/api/organization", config);
      console.log(response.data);
      yield put({ type: "SET_ORGANIZATION", payload: response.data[0] });
   } catch (error) {
      console.log("User get request failed", error);
   }
}
function* createOrganization(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.post('/api/organization', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_ORGANIZATION' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* editOrganization(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.put('/api/organization', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_ORGANIZATION' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* organizationSaga() {
   yield takeLatest("GET_ORGANIZATION", fetchOrganization);
   yield takeLatest("CREATE_ORGANIZATION", createOrganization);
   yield takeLatest("EDIT_ORGANIZATION", editOrganization);
}

export default organizationSaga;
