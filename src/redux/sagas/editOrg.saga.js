import { put, takeLatest } from "redux-saga/effects";


function* setEditOrg(action){
    yield put({type: 'EDIT_ORG', payload: action.payload})
}

function* editOrgSaga() {
    yield takeLatest("SET_EDIT_ORG", setEditOrg);
 }
 
 export default editOrgSaga;
 