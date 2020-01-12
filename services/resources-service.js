import axios from "axios";
import config from "../assets/config";

export const getUsersService = token => {
  return axios.get(`${config.apiEndpoint}User/GetAllUser`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getHospitalsService = token => {
  return axios.get(`${config.apiEndpoint}Hospital/GetAlls`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getGroupsService = token => {
  return axios.get(`${config.apiEndpoint}User/GetAllGroups`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
