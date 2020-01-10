import {
  getUsersService,
  getHospitalsService,
  getGroupsService
} from "../../services/resources-service";
import { GET_USERS, GET_HOSPITALS, GET_GROUPS } from "../types/ResourcesTypes";

export const getAllUsersAction = token => {
  return dispatch => {
    getUsersService(token)
      .then(res => {
        dispatch({ type: GET_USERS, payload: { users: res.data.result } });
      })
      .catch(err => console.log(err));
  };
};

export const getAllHospitalsAction = token => {
  return dispatch => {
    getHospitalsService(token).then(res => {
      dispatch({
        type: GET_HOSPITALS,
        payload: { hospitals: res.data.result }
      });
    });
  };
};

export const getAllGroupsAction = token => {
  return dispatch => {
    getGroupsService(token).then(res => {
      dispatch({ type: GET_GROUPS, payload: { groups: res.data.result } });
    });
  };
};
