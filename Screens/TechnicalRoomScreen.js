//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

// SEZIN CUSTOM COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinMRForm from "../components/General/SezinMRForm";
import SezinTomoForm from "../components/General/SezinTomoForm";
import { useSelector } from "react-redux";
import { colors } from "../assets/styles/colors";

// create a component
const TechnicalRoomScreen = props => {
  const [devices, setDevices] = useState([]);
  const menuItems = useSelector(state => state.AuthReducer.menuItems);
  //console.log(menuItems);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    let devs = [];
    menuItems.map(item => {
      if (item.functionName === "createMR") {
        devs.push({ label: "MR", value: "mr" });
      } else if (item.functionName === "createCT") {
        devs.push({ label: "Tomo", value: "tomo" });
      }
    });
    setDevices(devs);
  }, [menuItems]);

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0].value);
    }
  }, [devices]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
          containerStyle={{}}
        />
        <SezinTitle text="Teknik Oda Takibi" />
        <SezinDescription
          text={
            <Text>
              Buradan{" "}
              <Text style={{ color: colors.green }}>
                {" "}
                {selectedDevice === "mr" && "MR "}
                {selectedDevice === "tomo" && "Tomografi "}
              </Text>
              cihazlarımızın teknik oda değerlerinin bildirimlerini
              yapabilirsiniz.
            </Text>
          }
        />

        <SezinPicker
          contentContainerStyle={{ marginTop: 15 }}
          initialSelection={devices[0]}
          placeholderText="Cihaz"
          items={devices}
          onValueChange={value => setSelectedDevice(value)}
        />

        {selectedDevice === "mr" && <SezinMRForm />}
        {selectedDevice === "tomo" && <SezinTomoForm />}
      </View>
    </TouchableWithoutFeedback>
  );
};

TechnicalRoomScreen.navigationOptions = {
  header: null
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
});

//make this component available to the app
export default TechnicalRoomScreen;
