import axios from "axios";
import config from "../assets/config";

export const createNewBusinessOrder = (
  token,
  title,
  description,
  sendUserId,
  groupId,
  priority,
  finishDate
) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/createWorkOrder`,
    {
      title,
      description,
      priority,
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

export const getBusinessOrdersOnMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/GetOwnWorkOrders`,
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

export const getBusinessOrderByMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/MyCreateWorkOrders`,
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

export const getSingleBusinessOrderActivities = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/getWorkOrderDetailById`,
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBusinessStatus = (description, status, id, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/updateWorkOrder`,
    {
      description,
      status,
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSingleBusinessOrder = (id, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/GetWorkOrderById`,
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
