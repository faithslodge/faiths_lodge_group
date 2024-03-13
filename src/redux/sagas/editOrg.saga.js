import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editOrgUpdate(action) {
  yield axios.put(
    `/api/organization/${action.payload.updateOrg.org.id}`,
    action.payload
  );
  yield put({ type: "FETCH_ORGANIZATIONS" });
}

function* editOrgSaga() {
  yield takeLatest("EDIT_ORG_UPDATE", editOrgUpdate);
}

export default editOrgSaga;
