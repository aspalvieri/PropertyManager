import { CREATE_PROPERTY, GET_PROPERTIES, RESET_ALL_STATES } from "../actions/types";

const initialState = {
  properties: []
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return {
        ...state,
        properties: action.payload
      };
    case CREATE_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.payload]
      };
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}
