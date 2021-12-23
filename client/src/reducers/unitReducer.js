import { CREATE_UNIT, GET_UNITS, RESET_ALL_STATES } from "../actions/types";

const initialState = {
  units: []
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case GET_UNITS:
      return {
        ...state,
        units: action.payload
      };
    case CREATE_UNIT:
      return {
        ...state,
        units: [...state.units, action.payload]
      };
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}
