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
    alert("Error updating organization:", error);
  }
}

function* deleteOrg(action) {
  try {
    console.log("DELETE ID:", action.payload);
    yield axios.delete(`/api/organization/${action.payload}`);
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    alert("Error deleting organization:", error);
  }
}

function* verifyOrg(action) {
  try {
    yield axios.put(`/api/organization/verify/${action.payload}`);
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    alert("Error verifying organization:", error);
  }
}

function* unverifyOrg(action) {
  try {
    yield axios.put(`/api/organization/unverify/${action.payload}`);
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    alert("Error removing verification from organization:", error);
  }
}

function* editOrgSaga() {
  yield takeLatest("EDIT_ORG_UPDATE", editOrgUpdate);
  yield takeLatest("DELETE_ORG", deleteOrg);
  yield takeLatest("VERIFY_ORG", verifyOrg);
  yield takeLatest("UNVERIFY_ORG", unverifyOrg);
}

export default editOrgSaga;
