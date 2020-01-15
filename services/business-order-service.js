import axios from "axios";
import config from "../assets/config";

export const getNewBusinessOrderDocumentNumber = token => {
  return axios.get(`${config.apiEndpoint}WorkOrder/getDocumentationNo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createNewBusinessOrder = (
  token,
  title,
  description,
  sendUserId,
  groupId,
  priority,
  finishDate,
  documentationNo
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
      documentationNo
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getBusinessOrdersOnMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/getOwnWorkOrderWithPaging`,
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

export const getBusinessOrderByMe = (pageNumber, pageSize, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/myCreateWorkPaging`,
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

export const getSingleBusinessOrderActivities = (documentationNo, token) => {
  return axios.post(
    `${config.apiEndpoint}WorkOrder/workOrderMobileResponse`,
    {
      documentationNo
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
