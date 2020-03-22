import { loginConstants } from "./constants";

const initialState = {
    isAuthenticated: false,
    user:{},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginConstants.USER_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case loginConstants.LOGIN_ERROR:
            return {
                ...state,
                flag: true,
                message: action.payload,
                notificationType: "danger"
            };
        case loginConstants.LOGOUT:
            state = initialState;
            return {
                ...state
            };

        default:
            return state;
    }
};

export default authReducer;
