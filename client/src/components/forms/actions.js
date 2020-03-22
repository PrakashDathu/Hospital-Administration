import axios from "axios";
import {closeSnackbar, enqueueSnackbar} from "../Notiification/actions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";
import {changeStoreState} from "../../helpers/utils";
import {Constants} from "../../App/constants";

axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization =   token ? `Bearer ${token}` : '';
    return config;
});

export const createPatient = (values) => {
    return dispatch => {
        return axios
            .post("/api/client/patient", values)
            .then(response => {
                console.log(response);
                if(response.status === 200 && response.data._id) {
                    dispatch(enqueueSnackbar({
                        message: 'Patient Created  Successfully.',
                        options: {
                            variant: 'success',
                            action: key => (
                                <IconButton onClick={() => dispatch(closeSnackbar(key))}>
                                    <CloseIcon/>
                                </IconButton>
                            ),
                        },
                    }));
                    dispatch(
                        changeStoreState(Constants.CLOSE_REG_DIALOG, '')
                    );
                }
            })
            .catch(error => {
                dispatch(enqueueSnackbar({
                    message: 'Unable to create Patient Profile ',
                    options: {
                        variant: 'error',
                        action: key => (
                            <IconButton onClick={() => dispatch(closeSnackbar(key))}>
                                <CloseIcon/>
                            </IconButton>
                        ),
                    },
                }));
            });
            }
};