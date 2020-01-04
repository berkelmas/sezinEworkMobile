import { AsyncStorage } from "react-native";
import { loginService, menuService } from "../../services/auth-service";
import {
  START_LOGIN,
  FAILED_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN_TIMEOUT,
  GET_MENU
} from "../types/AuthTypes";
import NavigationService from "../../navigation/NavigationService";

export const loginStartAction = (username, password) => {
  return dispatch => {
    dispatch({ type: START_LOGIN });
    loginService(username, password)
      .then(res => {
        AsyncStorage.setItem("auth-values", JSON.stringify(res.data));
        menuService(res.data.access_token).then(menuItems => {
          // console.log(menuItems.data.result);
          AsyncStorage.setItem(
            "menu-items",
            JSON.stringify(menuItems.data.result)
          );
          dispatch(loginSuccessAction(res.data));
          dispatch(getMenuAction(menuItems.data.result));
          NavigationService.navigate("Home");
        });
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

export const loginFailedAction = () => ({
  type: FAILED_LOGIN
});

export const failedLoginTimeoutAction = () => ({
  type: FAILED_LOGIN_TIMEOUT
});

export const getMenuAction = menuItems => ({
  type: GET_MENU,
  payload: { menuItems }
});

// loginService(username, password).then(res => ({
//   type: START_LOGIN
// }));
