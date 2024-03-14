const newLogoReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_LOGO_DATA":
            return action.payload;
        case "RESET_LOGO_DATA":
            return {};
        default:
            return state;
    }
};

export default newLogoReducer;
