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

export const createNewPartialDayIzinRequest = (
  token,
  startDate,
  finishDate,
  description,
  startHour,
  finishHour
) => {
  return axios.post(
    `${config.apiEndpoint}Hr/createLeaveForm`,
    {
      startDate,
      finishDate,
      leaveType: 2,
      description,
      startHour,
      finishHour
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

export const getWaitingCancelApproveOrRejectIzin = (
  pageNumber,
  pageSize,
  token
) => {
  return axios.post(
    `${config.apiEndpoint}Hr/GetWaitingCancelLeavePaging`,
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

export const approveCancelIzin = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/acceptCancel`,
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

export const rejectCancelIzin = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}Hr/rejectCancel`,
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

export const calculateWorkDayIzin = (
  token,
  startDate,
  finishDate,
  leaveType
) => {
  return axios.post(
    `${config.apiEndpoint}Hr/calculateWorkDay`,
    {
      token,
      startDate,
      finishDate,
      leaveType
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
