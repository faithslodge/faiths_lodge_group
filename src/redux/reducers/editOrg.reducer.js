

const editOrg = (state = {}, action) => {
    switch (action.type) {
        case "EDIT_ORG":
            return {...state, ...action.payload}
        case "EDIT_SERVICE_TYPES":
            return [...state.serviceTypes, ...action.payload]
        case "EDIT_LOSS_TYPES":
            return [...state.lossTypes, ...action.payload]
        case "EDIT_ADDRESS":
            return {...state.serviceTypes, ...action.payload}
        case "EDIT_CONTACTS":
            return [...state.contacts, ...action.payload]
        default:
            return state
    }
}

export default editOrg