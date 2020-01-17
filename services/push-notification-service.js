import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import axios from "axios";
import config from "../assets/config";

export const savePushTokenAndUserId = (userId, pushToken) => {
  return axios.post(`${config.pushApiEndpoint}save`, {
    userId,
    pushToken
  });
};

export const registerForPushNotificationsAsync = async userId => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== "granted") {
    console.log("No notification permissions!");
    return;
  }

  // Get the token that identifies this device
  let pushToken = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });

  return savePushTokenAndUserId(userId, pushToken);
};
