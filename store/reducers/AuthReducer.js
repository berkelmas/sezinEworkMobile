// TYPES IMPORT
import * as authTypes from "../types/AuthTypes";

const initialState = {
  loggedIn: false,
  username: "berkelmas",
  loading: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.START_LOGIN:
      return { ...state, loading: true };
    case authTypes.LOGOUT:
      return { ...state, loggedIn: false, username: "" };
    case authTypes.SUCCESS_LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        loading: action.payload.loading
      };
    case authTypes.FAILED_LOGIN:
      return { ...state, loggedIn: false, loading: action.payload.loading };
    default:
      return state;
  }
};

export default AuthReducer;
