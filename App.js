import React from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";

// REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

// REDUX DEV-TOOLS EXTENSION PLUGIN
import { composeWithDevTools } from "redux-devtools-extension";

// REDUX THUNK FOR ASYNC ACTIONS
import thunk from "redux-thunk";

// REDUCER
import RootReducer from "./store/reducers/index";
const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

import MyApp from "./navigation/navigation";

import { LocaleConfig } from "react-native-calendars";

const App = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Font.loadAsync({
      "Airbnb-Black": require("./assets/fonts/AirbnbCerealBlack.ttf"),
      "Airbnb-Bold": require("./assets/fonts/AirbnbCerealBold.ttf"),
      "Airbnb-Book": require("./assets/fonts/AirbnbCerealBook.ttf"),
      "Airbnb-Extra-Bold": require("./assets/fonts/AirbnbCerealExtraBold.ttf"),
      "Airbnb-Light": require("./assets/fonts/AirbnbCerealLight.ttf"),
      "Airbnb-Medium": require("./assets/fonts/AirbnbCerealMedium.ttf"),
      Icomoon: require("./assets/fonts/icomoon.ttf")
    }).then(() => setLoaded(true));
    StatusBar.setHidden(true);
  }, []);

  {
    /* REACT NATIVE CALENDAR LOCALIZATION */
  }
  LocaleConfig.locales["tr"] = {
    monthNames: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ],
    monthNamesShort: [
      "Ock.",
      "Şbt.",
      "Mrt.",
      "Nisn ",
      "Mys.",
      "Hzr.",
      "Tem.",
      "Auğ.",
      "Eyl.",
      "Ekm.",
      "Ksm.",
      "Arlk."
    ],
    dayNames: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi"
    ],
    dayNamesShort: ["Paz.", "Pzt.", "Sal.", "Çrs.", "Prş.", "Cum.", "Cmt."],
    today: "Bugün"
  };
  LocaleConfig.defaultLocale = "tr";

  return (
    loaded && (
      <Provider store={store}>
        <MyApp />
      </Provider>
    )
  );
};

export default App;
