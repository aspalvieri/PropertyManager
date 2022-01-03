import axios from "axios";
import { config } from "../utils/configs";

import { GET_UNITS, CREATE_UNIT, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getUnits = (property_id, history) => dispatch => {
  axios.get(`${config.SERVER_URI}/api/units`, { 
    params: {
      id: property_id 
    }
  })
  .then(res => {
    const units = res.data || [];
    dispatch({
      type: GET_UNITS,
      payload: units
    });
  })
  .catch(err => {
    //Possible errors include units/property not being found
    console.log(err);
    history.push("/dashboard");
  });
}

export const createUnit = userData => dispatch => {
  axios.post(`${config.SERVER_URI}/api/units`, userData)
  .then(res => {
    dispatch({
      type: CREATE_UNIT,
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
