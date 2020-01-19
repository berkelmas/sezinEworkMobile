import axios from "axios";
import config from "../assets/config";

export const sendMrForm = (
  helyumValue,
  pressureValue,
  waterTempValue,
  roomDempValue,
  airConditionValue,
  upsValue,
  chillerValue,
  cleanType,
  description,
  token
) => {
  return axios.post(
    `${config.apiEndpoint}TechnicalRoom/createTechnicalRoomFormMR`,
    {
      helyumValue,
      pressureValue,
      waterTempValue,
      roomDempValue,
      airConditionValue,
      upsValue,
      chillerValue,
      cleanType,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const sendTomoForm = (
  airConditionValue,
  upsValue,
  roomDempValue,
  cleanType,
  description,
  token
) => {
  return axios.post(
    `${config.apiEndpoint}TechnicalRoom/createTechnicalRoomFormCT`,
    {
      airConditionValue,
      upsValue,
      roomDempValue,
      cleanType,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
