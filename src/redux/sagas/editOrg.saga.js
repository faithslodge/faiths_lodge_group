import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editOrgUpdate(action) {
  try {
    yield axios.put(
      `/api/organization/${action.payload.updateOrg.org.id}`,
      action.payload
    );
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    alert("Error updating organization:", error)
  }
}

function* deleteOrg(action){
  try {
    console.log("DELETE ID:", action.payload)
    yield axios.delete(
      `/api/organization/${action.payload}`
    );
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    alert("Error deleting organization:", error)
  }
}



function* editOrgSaga() {
  yield takeLatest("EDIT_ORG_UPDATE", editOrgUpdate);
  yield takeLatest("DELETE_ORG", deleteOrg);
}

export default editOrgSaga;
