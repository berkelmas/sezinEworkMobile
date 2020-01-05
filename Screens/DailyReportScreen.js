//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// CUSTOM SEZIN COMPONENTS
import SezinPicker from "../components/Inputs/SezinPicker";

// create a component
const DailyReportScreen = () => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    setDevices([
      {
        label: "KMD",
        value: "kmd"
      },
      {
        label: "MAMO",
        value: "mamo"
      },
      {
        label: "USG",
        value: "usg"
      },
      {
        label: "Rapor",
        value: "rapor"
      }
    ]);
  }, []);

  console.log("daily rendered");

  return (
    <View style={styles.container}>
      <SezinPicker placeholderText="Cihaz" items={devices} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

DailyReportScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default DailyReportScreen;
