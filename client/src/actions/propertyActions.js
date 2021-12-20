import axios from "axios";
import { config } from "../utils/configs";

import { GET_PROPERTIES, CREATE_PROPERTY, GET_ERRORS, CLEAR_ERRORS } from "./types";

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
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}
