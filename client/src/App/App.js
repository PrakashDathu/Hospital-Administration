import React, {Component} from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import "./App.css";
import { getProfileFetch } from "./actions";
import * as PropTypes from "prop-types";
import { SnackbarProvider } from 'notistack';
import Notifier from "../components/Notiification/Notifier";
import Dashboard from "../views/Dashboard";
import {dTheme, lTheme} from "../theme";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import SignIn from "../views/Auth/SignIn";
import SignUp from "../views/Auth/SignUp";
import Verify from "../views/Auth/Verify";
import {logoutAction} from "../views/Auth/actions";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      darkMode: false,
    };
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  componentDidMount = () => {
    const history = this.props.history;
    this.props.getProfileFetch(history);
  };

  toggleChecked = () => {
    const curr = this.state.darkMode;
    this.setState({
      darkMode: !curr,
    });
  };
  render() {
    const { darkMode } = this.state;
    const loggedIn = this.props.auth.isAuthenticated;
    return (
        <div className="App">
          <ThemeProvider theme={darkMode ? dTheme : lTheme}>
            <SnackbarProvider>
              <Notifier/>
              <Switch>
                <PrivateRoute
                    isLoggedIn={ loggedIn }
                    path="/dashboard"
                    component={Dashboard}
                    logout = {this.props.logout}
                    handleTheme={this.toggleChecked}
                    isDarkMode={darkMode}
                />
                <PublicRoute
                    isLoggedIn={ loggedIn }
                    path="/login"
                    component={SignIn}
                    restricted={true}
                    {...this.props}
                />
                <PublicRoute
                    isLoggedIn={loggedIn}
                    path="/register"
                    component={SignUp}
                    restricted={true}
                    {...this.props}
                />
                <PublicRoute
                    isLoggedIn={loggedIn}
                    path="/verify/:token"
                    component={Verify}
                    restricted={true}
                    {...this.props}
                />
                <Route exact path="/">
                  {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
                </Route>
              </Switch>
            </SnackbarProvider>
          </ThemeProvider>
        </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app,

});
const mapDispatchToProps = dispatch => ({
  getProfileFetch: (hist) => dispatch(getProfileFetch(hist)),
  logout: (hist) => dispatch(logoutAction(hist))
});
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));