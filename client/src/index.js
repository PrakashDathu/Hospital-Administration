import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import App from './App/App'
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
                <App />
            </Router>
        </MuiPickersUtilsProvider>
    </Provider>,
    rootElement
);
