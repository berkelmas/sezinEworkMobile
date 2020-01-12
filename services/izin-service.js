import axios from "axios";
import config from "../assets/config";

export const createNewIzinRequest = (
  token,
  startDate,
  finishDate,
  leaveType,
  description
) => {
  return axios.post(
    `${config.apiEndpoint}Hr/createLeaveForm`,
    {
      startDate,
      finishDate,
      leaveType,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
