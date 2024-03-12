import { combineReducers } from "redux"


const editOrg = (state = {}, action) => {
    switch (action.type) {
        case "EDIT_ORG":
            return {...state, ...action.payload}
        default:
            return state
    }
}

const editOrgServiceTypes = (state = [], action) => {
    switch (action.type) {
        case "EDIT_ORG_SERVICE_TYPES":
            return action.payload
        default:
            return state
    }
}

const editOrgLossTypes = (state = [], action) => {
    switch (action.type) {
        case "EDIT_ORG_LOSS_TYPES":
            return action.payload
        default:
            return state
    }
}

const editOrgContacts = (state = [], action) => {
    switch (action.type) {
        case "EDIT_ORG_CONTACTS":
            return [...state, ...action.payload]
        default:
            return state
    }
}


export default combineReducers({
    editOrg,
    editOrgServiceTypes,
    editOrgLossTypes,
    editOrgContacts
})