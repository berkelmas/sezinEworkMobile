import { AsyncStorage } from "react-native";
import { loginService, menuService } from "../../services/auth-service";
import {
  START_LOGIN,
  FAILED_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN_TIMEOUT
} from "../types/AuthTypes";
import NavigationService from "../../navigation/NavigationService";

export const loginStartAction = (username, password) => {
  return dispatch => {
    dispatch({ type: START_LOGIN });
    loginService(username, password)
      .then(res => {
        dispatch(loginSuccessAction(res.data));
        AsyncStorage.setItem("auth-values", JSON.stringify(res.data));
        NavigationService.navigate("Home");
      })
      .catch(err => {
        dispatch(loginFailedAction());
        setTimeout(() => {
          dispatch(failedLoginTimeoutAction());
        }, 2000);
      });
  };
};

export const loginSuccessAction = res => ({
  type: SUCCESS_LOGIN,
  payload: { ...res }
});

const loginFailedAction = () => ({
  type: FAILED_LOGIN
});

const failedLoginTimeoutAction = () => ({
  type: FAILED_LOGIN_TIMEOUT
});

// loginService(username, password).then(res => ({
//   type: START_LOGIN
// }));
