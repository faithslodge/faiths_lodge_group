import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


function* editOrgUpdate(action) {
    yield axios.put(`/api/organization/${action.payload.org.id}`, action.payload);
    yield console.log("action.payload", action.payload)
 }

 function* editOrgSaga() {
    yield takeLatest("EDIT_ORG_UPDATE", editOrgUpdate);
 }

 export default editOrgSaga;
 