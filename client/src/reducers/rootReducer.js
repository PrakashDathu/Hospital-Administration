/**
 * Root reducer
 */
import { combineReducers } from 'redux';
import appReducer from "../App/reducers";
import authReducer from "../views/Auth/authReducer";
import patientReducer from "../views/SearchPage/patientsReducer";

export default asyncReducers =>
    combineReducers({
            app: appReducer,
            auth: authReducer,
            data: patientReducer,
            ...asyncReducers
    });
