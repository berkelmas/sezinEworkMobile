//import liraries
import React from "react";
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
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinMRForm from "../components/General/SezinMRForm";
import SezinTomoForm from "../components/General/SezinTomoForm";

// create a component
const TechnicalRoomScreen = props => {
  const [devices, setDevices] = React.useState([
    { label: "MR", value: "mr" },
    { label: "Tomo", value: "tomo" }
  ]);

  const [selectedDevice, setSelectedDevice] = React.useState(devices[0].value);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
          containerStyle={{}}
        />
        <SezinTitle text="Teknik Oda Takibi" />

        <SezinPicker
          initialSelection={devices[0]}
          placeholderText="Cihaz"
          items={devices}
          onValueChange={value => setSelectedDevice(value)}
        />

        {selectedDevice === "mr" ? <SezinMRForm /> : <SezinTomoForm />}
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
