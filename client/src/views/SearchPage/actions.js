import axios from "axios";
import {searchConstants} from "./constants"
import {changeStoreState} from "../../helpers/utils";

axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization =   token ? `Bearer ${token}` : '';
    return config;
});

export const loadPatientRecords = () => {
    return dispatch => {
        return axios
            .get("/api/client/")
            .then(response => {
                    console.log(response);
                    let records= response.data.patients;
                    dispatch(changeStoreState(searchConstants.LOAD_REPORTS,records));
            })
            .catch(error => {
            });
    }
};

export const loadPatientPrescription = (did, pid) => {
    return dispatch => {
        return axios
            .get("/api/presc/"+did+"/"+pid)
            .then(response => {
                console.log(response);
                 let records= response.data.prescriptions;
                 dispatch(changeStoreState(searchConstants.LOAD_PRESCRIPTION,records));
            })
            .catch(error => {
            });
    }
};