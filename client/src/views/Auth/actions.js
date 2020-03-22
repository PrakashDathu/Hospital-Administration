import {loginConstants} from "./constants"
import {changeStoreState, notify} from "../../helpers/utils";
import axios from "axios";

export const loginAction = (email, password, history) => {
    return dispatch => {
        let user = {};
        user.email = email;
        user.password = password;
        return axios
            .post("/api/auth/login", user)
            .then(response => {
                 if(response.status === 200 && response.data.user){
                     dispatch(notify(response.data.message,'success'));
                     sessionStorage.setItem("token", response.data.user.token);
                     dispatch(
                         changeStoreState(loginConstants.USER_IS_AUTHENTICATED, response.data.user)
                     );
                     history.push("/dashboard");
                 }
            })
            .catch(error => {
                const errorMsg = error.response.data.message;
                dispatch(notify(errorMsg, 'error'));
            });
    };
};

export const logoutAction = history => {
    return dispatch => {
        dispatch(changeStoreState(loginConstants.LOGOUT, ""));
        sessionStorage.removeItem('token');
        history.push("/");
    };
};

export const registerAction = (state, hist) => {
  return dispatch => {
      return axios
          .post("/api/auth/signup", state)
          .then(response => {
              console.log(response);
              if (response.status === 200) {
                  hist.push('/login');
                  dispatch(notify(response.data.message,'success'));
              }
          })
          .catch(error => {
              const errorMsg = error.response.data.message;
              dispatch(notify(errorMsg, 'error'));
          });

};
  };

export const verifyAction = (token, history) => {
    return dispatch => {
        return axios
            .get("/api/auth/verify/"+token)
            .then(response => {
                if(response.status === 200){
                    dispatch(notify(response.data.message,'success'));
                    history.push("/login");
                }
            })
            .catch(error => {
                const errorMsg = error.response.data.message;
                dispatch(notify(errorMsg, 'error'));
            });
    };
};