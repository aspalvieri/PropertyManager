import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import PageNotFound from "./components/layout/404";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { config } from "./utils/configs";

import "./scss/materialize.scss"; //materialize scss
import "./scss/App.scss"; //App scss
import "materialize-css"; //materialize js

class App extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    if (localStorage.jwtToken) {
      //Check for version mismatch
      if (!localStorage.VERSION || localStorage.VERSION !== config.VERSION) {
        localStorage.removeItem("VERSION");
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }
    this.setState({ loading: false });
  }

  render() {
    const loading = this.state.loading;

    if (loading) {
      return (
        <div className="App">
          <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto", width: "15em", height: "15em"}} 
          className="preloader-wrapper active">
            <div className="spinner-layer">
              <div className="circle-clipper left">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div><div className="gap-patch">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div><div className="circle-clipper right">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
