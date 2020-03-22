import {changeStoreState, notify} from "../helpers/utils";
import {Constants} from "./constants";
import axios from "axios";
import {loginConstants} from "../views/Auth/constants";

export const openAction = () => {
    return dispatch => {
        dispatch(changeStoreState(Constants.OPEN_REG_DIALOG,''));
    }
};
export const getProfileFetch = (hist) => {
    return dispatch => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axios.get('/api/auth/verifyJwt', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    dispatch(
                        changeStoreState(loginConstants.USER_IS_AUTHENTICATED, response.data.user)
                    );
                    hist.push('/dashboard');
                    dispatch(notify(response.data.message,'success'));
                    sessionStorage.setItem("token", response.data.user.token);
                }).catch(error => {
                const errorMsg = error.response.data.message;
                dispatch(notify(errorMsg, 'error'));
            });
        }
    };
};

export const closeAction = () => {
    return dispatch => {
        dispatch(changeStoreState(Constants.CLOSE_REG_DIALOG,''));
    }
};
