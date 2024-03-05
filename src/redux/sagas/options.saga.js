import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/*
------------------------------ Type of Loss functions ------------------------------
*/
// Fetch losses from DB
function* fetchLosses() {
  try {
    const lossesResponse = yield axios.get("/api/option/loss");
    yield put({ type: "SET_LOSSES", payload: lossesResponse.data });
  } catch (error) {
    console.log("Error with fetchLosses:", error);
  }
}

//Add Loss to DB
function* addLoss(action) {
  try {
    yield axios.post("/api/option/loss", action.payload);
    yield put({ type: "FETCH_LOSSES" });
  } catch (error) {
    console.log("Error with addLoss:", error);
  }
}

//Update Loss in DB
function* updateLoss(action) {
  try {
    yield axios.put(`/api/option/loss/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_LOSSES" });
  } catch (error) {
    console.log("Error with updateLoss:", error);
  }
}

/*
 ------------------------------ Services Provided Functions ------------------------------
*/

function* fetchServices() {
  try {
    const servicesResponse = yield axios.get("/api/option/service");
    yield put({ type: "SET_SERVICES", payload: servicesResponse.data });
  } catch (error) {
    console.log("Error with fetchServices:", error);
  }
}

//Add Service to DB
function* addService(action) {
  try {
    yield axios.post("/api/option/service", action.payload);
    yield put({ type: "FETCH_SERVICES" });
  } catch (error) {
    console.log("Error with addService:", error);
  }
}

//Update Service in DB
function* updateService(action) {
  try {
    yield axios.put(`/api/option/service/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_SERVICES" });
  } catch (error) {
    console.log("Error with updateService:", error);
  }
}

function* optionsSaga() {
  yield takeLatest("FETCH_LOSSES", fetchLosses);
  yield takeLatest("FETCH_SERVICES", fetchServices);
  yield takeLatest("ADD_LOSS", addLoss);
  yield takeLatest("ADD_SERVICE", addService);
  yield takeLatest("UPDATE_LOSS", updateLoss);
  yield takeLatest("UPDATE_SERVICE", updateService);
}

export default optionsSaga;
