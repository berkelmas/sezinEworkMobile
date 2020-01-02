// TYPES IMPORT
import * as authTypes from "../types/AuthTypes";

const initialState = {
  loggedIn: false,
  username: null,
  loading: false,
  accessToken: null,
  fullName: null,
  userImage: null,
  userGroup: null,
  userHospitalName: null,
  userEmail: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.START_LOGIN:
      return { ...state, loading: true };
    case authTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        username: null,
        loading: false,
        accessToken: null,
        fullName: null,
        userImage: null,
        userGroup: null,
        userHospitalName: null,
        userEmail: null
      };
    case authTypes.SUCCESS_LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.userName,
        loading: false,
        accessToken: action.payload.access_token,
        fullName: action.payload.userInformation,
        userImage: action.payload.userImage,
        userGroup: action.payload.userGroup,
        userHospitalName: action.payload.userHospitalName,
        userEmail: action.payload.userEmail
      };
    case authTypes.FAILED_LOGIN:
      return {
        ...state,
        loggedIn: false,
        username: null,
        loading: false,
        accessToken: null,
        fullName: null,
        userImage: null,
        userGroup: null,
        userHospitalName: null,
        userEmail: null
      };
    default:
      return state;
  }
};

export default AuthReducer;
