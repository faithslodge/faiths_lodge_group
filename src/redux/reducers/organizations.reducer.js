
// reducer to store organization info
const organizationsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORGANIZATIONS":
            return action.payload
        default:
            return state
    }
}

export default organizationsReducer