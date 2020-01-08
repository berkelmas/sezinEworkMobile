import axios from "axios";
import config from "../assets/config";

export const addDailyReport = (count, startHour, finishHour, type, token) => {
  return axios.post(
    `${config.apiEndpoint}TechnicalRoom/createTechnicalRoom`,
    {
      count,
      startHour,
      finishHour,
      type
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
