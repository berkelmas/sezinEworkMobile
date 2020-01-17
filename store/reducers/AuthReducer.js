// TYPES IMPORT
import * as authTypes from "../types/AuthTypes";

const initialState = {
  loggedIn: false,
  userName: null,
  loading: false,
  accessToken: null,
  refreshToken: null,
  fullName: null,
  userImage: null,
  userGroup: null,
  userHospitalName: null,
  userEmail: null,
  userId: null,
  failedLogin: false,
  menuItems: []
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.START_LOGIN:
      return { ...state, loading: true };
    case authTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userName: null,
        loading: false,
        accessToken: null,
        refreshToken: null,
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
        userName: action.payload.userName,
        loading: false,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        fullName: action.payload.userInformation,
        userImage: action.payload.userImage,
        userGroup: action.payload.userGroup,
        userHospitalName: action.payload.userHospitalName,
        userEmail: action.payload.userEmail,
        userId: action.payload.userId,
        failedLogin: false
      };
    case authTypes.FAILED_LOGIN:
      return {
        ...state,
        loggedIn: false,
        userName: null,
        loading: false,
        accessToken: null,
        refreshToken: null,
        fullName: null,
        userImage: null,
        userGroup: null,
        userHospitalName: null,
        userEmail: null,
        userId: null,
        failedLogin: true
      };
    case authTypes.FAILED_LOGIN_TIMEOUT:
      return {
        ...state,
        failedLogin: false
      };
    case authTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userName: null,
        loading: false,
        accessToken: null,
        refreshToken: null,
        fullName: null,
        userImage: null,
        userGroup: null,
        userHospitalName: null,
        userEmail: null,
        userId: null,
        failedLogin: false,
        menuItems: []
      };
    case authTypes.GET_MENU:
      return {
        ...state,
        menuItems: action.payload.menuItems
      };
    default:
      return state;
  }
};

export default AuthReducer;
