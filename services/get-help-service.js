import axios from "axios";
import config from "../assets/config";

export const createHelpRequestLoggedIn = (
  fullName,
  title,
  description,
  token
) => {
  return axios.post(
    `${config.apiEndpoint}System/sendHelp`,
    {
      fullName,
      title,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const createHelpRequestNotLoggedIn = (fullname, title, description) => {
  return axios.post(`${config.apiEndpoint}sendHelpWithoutLogin`, {
    fullname,
    title,
    description
  });
};
