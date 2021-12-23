import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { config } from "../utils/configs";

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER, USER_LOADING, RESET_ALL_STATES } from "./types";

// Register User
export const registerUser = (userData, props) => dispatch => {
  axios.post(`${config.SERVER_URI}/api/users/register`, userData)
  .then(res => {
    //Clear any errors on the screen
    dispatch({ type: CLEAR_ERRORS });
    props.history.push("/login?registered=true");
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post(`${config.SERVER_URI}/api/users/login`, userData)
  .then(res => {
    // Set token to localStorage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("VERSION", config.VERSION);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
    //Clear any errors
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = value => {
  return {
    type: USER_LOADING,
    payload: value
  };
};

// Log user out
export const logoutUser = (persistor) => dispatch => {
  if (persistor)
    persistor.purge();
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  dispatch({ type: RESET_ALL_STATES });
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
