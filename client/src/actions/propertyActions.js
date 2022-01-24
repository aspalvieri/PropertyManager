import axios from "axios";
import { config } from "../utils/configs";

import { GET_PROPERTIES, CREATE_PROPERTY, DELETE_PROPERTY, UPDATE_PROPERTY, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getProperties = () => dispatch => {
  axios.get(`${config.SERVER_URI}/api/properties`)
  .then(res => {
    const properties = res.data || [];
    dispatch({
      type: GET_PROPERTIES,
      payload: properties
    });
  })
  .catch(err => {
    //We'll want to push to dashboard once we separate properties from dashboard
    console.log(err);
  });
}

export const createProperty = userData => dispatch => {
  axios.post(`${config.SERVER_URI}/api/properties`, userData)
  .then(res => {
    dispatch({
      type: CREATE_PROPERTY,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const deleteProperty = id => dispatch => {
  axios.post(`${config.SERVER_URI}/api/properties/delete`, { id: id})
  .then(res => {
    dispatch({
      type: DELETE_PROPERTY,
      payload: id
    });
  })
  .catch(err => {
    console.log(err);
  });
}

export const updateProperty = (userData) => dispatch => {
  axios.post(`${config.SERVER_URI}/api/properties/update`, userData)
  .then(res => {
    dispatch({
      type: UPDATE_PROPERTY,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}
