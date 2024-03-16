
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
      const { organizationDetails, logoData } = action.payload;
      // console.log("[inside createOrganizations of organization.saga] logoData:", logoData);
      // console.log("[inside createOrganizations of organization.saga] type of logoData:", typeof logoData);

            const formWithLogo = new FormData();
            formWithLogo.append("logo_to_upload", logoData);
            // console.log("[inside createOrganizations of organization.saga] formWithLogo:", formWithLogo);

      const logoPostRes = yield axios.post('/api/logo', formWithLogo);
      console.log("[inside createOrganizations of organization.saga] res from logo upload:", logoPostRes);
      // console.log("[inside createOrganizations of organization.saga] the returned logo id:", logoPostRes.data.id);
      // console.log("[inside createOrganizations of organization.saga] organizationDetails:", organizationDetails);
      const logoId = logoPostRes.data.id;

      // console.log("[inside createOrganizations of organization.saga] organizationDetails after formWithLogo deletion:", organizationDetails);

      let logoIdObj = {logoId: logoId};
      yield axios.post('/api/organization', {organizationDetails: {...organizationDetails, ...logoIdObj}});
      
      yield put({ type: 'FETCH_ORGANIZATIONS' });

      // remove the logo data from the logo reducer
      yield put({ type: 'RESET_LOGO_DATA'})
   } catch (error) {
      handleError(error)
   }
}

function* organizationsSaga() {
   yield takeLatest("FETCH_ORGANIZATIONS", fetchOrganizations);
   yield takeLatest("CREATE_ORGANIZATION", createOrganizations);
}

export default organizationsSaga;
