import { loginService, menuService } from "../../services/auth-service";
import {
  START_LOGIN,
  FAILED_LOGIN,
  LOGIN,
  SUCCESS_LOGIN
} from "../types/AuthTypes";

export const loginStartAction = (username, password) => {
  return dispatch => {
    dispatch({ type: START_LOGIN });
    loginService(username, password)
      .then(res => {
        console.log(res);
        dispatch(loginSuccessAction(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailedAction());
      });
  };
};

const loginSuccessAction = res => ({
  type: SUCCESS_LOGIN,
  res
});

const loginFailedAction = () => ({
  type: FAILED_LOGIN
});

// loginService(username, password).then(res => ({
//   type: START_LOGIN
// }));
