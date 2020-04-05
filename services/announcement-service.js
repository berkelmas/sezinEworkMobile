import axios from "axios";
import config from "../assets/config";

export const getAnnouncements = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}System/getAllNoticeByCriteria`,
    {
      pageNumber,
      pageSize,
      sortField: "startDate",
      sort: "desc",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
