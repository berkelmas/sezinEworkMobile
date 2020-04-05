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
      finishDate,
      sendUserId,
      groupId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getBusinessReportsByMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/createAreaTrackByMe`,
    {
      pageNumber,
      pageSize,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getBusinessReportsOnMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/GetMyAreaTrack`,
    {
      pageNumber,
      pageSize,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
