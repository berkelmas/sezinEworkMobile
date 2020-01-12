import axios from "axios";
import config from "../assets/config";

export const createNewBusinessReport = (
  token,
  title,
  description,
  sendUserId,
  groupId,
  finishDate
) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/createAreaTrack`,
    {
      title,
      description,
      sendUserId,
      groupId,
      finishDate
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
