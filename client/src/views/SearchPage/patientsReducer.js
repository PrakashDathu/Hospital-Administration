import { searchConstants } from "./constants";
import {loginConstants} from "../Auth/constants";

const initialState = {
   patients: [],
   prescriptions: [],
};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchConstants.LOAD_REPORTS :
            return {
                ...state,
                patients: action.payload,
            };
        case searchConstants.LOAD_PRESCRIPTION :
            return {
                ...state,
                prescriptions: action.payload,
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

export default patientReducer;
