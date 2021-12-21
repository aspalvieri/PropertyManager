import { CLEAR_ERRORS, GET_ERRORS, RESET_ALL_STATES } from "../actions/types";

const initialState = {};

export default function errorReducers(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}
