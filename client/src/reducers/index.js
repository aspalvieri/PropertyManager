import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import propertyReducer from "./propertyReducer";
import unitReducer from "./unitReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  properties: propertyReducer,
  units: unitReducer
});
