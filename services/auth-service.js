import axios from "axios";
import config from "../assets/config";

export const loginService = (username, password) => {
  return axios.post(config.tokenEndpoint, {
    grant_type: "password",
    client_id: "345e1927a3214f68abc79f2183837fd1",
    username,
    password
  });
};

export const menuService = token => {
  return axios.get(`${config.apiEndpoint}MenuAuthorization/GetUserMenuMobile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
