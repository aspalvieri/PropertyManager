import { CREATE_PROPERTY, DELETE_PROPERTY, GET_PROPERTIES, RESET_ALL_STATES, UPDATE_PROPERTY } from "../actions/types";

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
    case DELETE_PROPERTY:
      return {
        ...state,
        properties: state.properties.filter(property => property._id !== action.payload)
      };
    case UPDATE_PROPERTY:
      return {
        ...state,
        properties: state.properties.map(property => {
          if (property._id === action.payload._id) {
            property.name = action.payload.name;
          }
          return property;
        })
      }
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}
