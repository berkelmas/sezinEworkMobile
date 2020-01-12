import axios from "axios";
import config from "../assets/config";

export const getAnnouncements = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}System/getNoticePaging`,
    {
      pageNumber,
      pageSize
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
