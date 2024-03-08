// reducer to store organization info filtered results
const filterReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_FILTER_ORGS":
            return action.payload
        default:
            return state
    }
}

export default filterReducer