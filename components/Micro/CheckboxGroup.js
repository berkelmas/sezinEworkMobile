//import liraries
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { colors } from "../../assets/styles/colors";

// create a component
const CheckboxGroup = () => {
  const [redCheckboxChecked, setRedCheckboxChecked] = useState(true);
  const [blueCheckboxChecked, setBlueCheckboxChecked] = useState(false);
  const [greenCheckboxChecked, setGreenCheckboxChecked] = useState(false);

  /*   useEffect(() => {
    if (redCheckboxChecked) {
      setBlueCheckboxChecked(false);
      setGreenCheckboxChecked(false);
    } else if (blueCheckboxChecked) {
      setRedCheckBoxChecked(false);
      setGreenCheckboxChecked(false);
    } else if (greenCheckboxChecked) {
      setRedCheckBoxChecked(false);
      setBlueCheckboxChecked(false);
    }
  }, [redCheckboxChecked, blueCheckboxChecked, greenCheckboxChecked]); */

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}
    >
      <CheckBox
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 0
        }}
        wrapperStyle={{ backgroundColor: "transparent" }}
        start
        textStyle={{
          fontSize: 14,
          fontFamily: "Airbnb-Light"
        }}
        title="Başlanmadı"
        checkedColor={colors.red}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={redCheckboxChecked}
        onPress={() => {
          setRedCheckboxChecked(prev => {
            if (prev) {
              return false;
            } else {
              setBlueCheckboxChecked(false);
              setGreenCheckboxChecked(false);
              return true;
            }
          });
        }}
      />
      <CheckBox
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 0
        }}
        wrapperStyle={{ backgroundColor: "transparent" }}
        start
        textStyle={{
          fontSize: 15,
          fontFamily: "Airbnb-Light"
        }}
        title="Çalışılıyor"
        checkedColor={colors.blue}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={blueCheckboxChecked}
        onPress={() => {
          setBlueCheckboxChecked(prev => {
            if (prev) {
              return false;
            } else {
              setRedCheckboxChecked(false);
              setGreenCheckboxChecked(false);
              return true;
            }
          });
        }}
      />
      <CheckBox
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 0
        }}
        wrapperStyle={{ backgroundColor: "transparent" }}
        start
        textStyle={{
          fontSize: 15,
          fontFamily: "Airbnb-Light"
        }}
        title="Tamamlandı"
        checkedColor={colors.green}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={greenCheckboxChecked}
        onPress={() => {
          setGreenCheckboxChecked(prev => {
            if (prev) {
              return false;
            } else {
              setRedCheckboxChecked(false);
              setBlueCheckboxChecked(false);
              return true;
            }
          });
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default CheckboxGroup;
