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

export const getTotalIzin = token => {
  return axios.get(`${config.apiEndpoint}Hr/getTotalLeaveCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getOwnIzinRequests = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/getOwnLeaveFormPaging`,
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

export const cancelOwnIzinRequest = (Id, cancelDescription, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/cancelOwnLeaveRequest`,
    {
      Id,
      cancelDescription
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getSingleIzinById = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/GetLeaveFormById`,
    {
      id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getWaitingApproveOrDenyIzinPaging = (
  pageNumber,
  pageSize,
  token
) => {
  return axios.post(
    `${config.apiEndpoint}Hr/getWaitingLeavePaging`,
    {
      pageSize,
      pageNumber
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const approveIzin = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/approve`,
    {
      id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const rejectIzin = (id, rejectDescription, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/reject`,
    {
      id,
      rejectDescription
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
