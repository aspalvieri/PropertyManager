import { SET_CURRENT_USER, USER_LOADING, CREATE_PROPERTY, GET_PROPERTIES, RESET_ALL_STATES } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CREATE_PROPERTY:
      return {
        ...state,
        user: {
          ...state.user,
          roleUser: {
            ...state.user.roleUser,
            properties: [...state.user.roleUser.properties, action.payload]
          }
        }
      };
    case GET_PROPERTIES:
      return {
        ...state,
        user: {
          ...state.user,
          roleUser: {
            ...state.user.roleUser,
            properties: action.payload
          }
        }
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}
