//import liraries
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { colors } from "../../assets/styles/colors";

// create a component
const CheckboxGroup = props => {
  const [redCheckboxChecked, setRedCheckboxChecked] = useState(true);
  const [blueCheckboxChecked, setBlueCheckboxChecked] = useState(false);
  const [greenCheckboxChecked, setGreenCheckboxChecked] = useState(false);
  const [darkRedCheckboxChecked, setDarkRedCheckboxChecked] = useState(false);

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

  useEffect(() => {
    if (redCheckboxChecked) {
      props.onChangeCheckbox("red");
    } else if (blueCheckboxChecked) {
      props.onChangeCheckbox("blue");
    } else if (greenCheckboxChecked) {
      props.onChangeCheckbox("green");
    } else if (darkRedCheckboxChecked) {
      props.onChangeCheckbox("darkred");
    }
  }, [
    redCheckboxChecked,
    blueCheckboxChecked,
    greenCheckboxChecked,
    darkRedCheckboxChecked
  ]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 10
      }}
    >
      <View>
        <CheckBox
          containerStyle={{
            backgroundColor: "transparent",
            borderWidth: 0,
            paddingHorizontal: 0
          }}
          wrapperStyle={{ backgroundColor: "transparent" }}
          start
          textStyle={styles.checkboxText}
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
                setDarkRedCheckboxChecked(false);
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
          textStyle={styles.checkboxText}
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
                setDarkRedCheckboxChecked(false);
                return true;
              }
            });
          }}
        />
      </View>

      <View>
        <CheckBox
          containerStyle={{
            backgroundColor: "transparent",
            borderWidth: 0,
            paddingHorizontal: 0
          }}
          wrapperStyle={{ backgroundColor: "transparent" }}
          start
          textStyle={styles.checkboxText}
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
                setDarkRedCheckboxChecked(false);
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
          textStyle={styles.checkboxText}
          title="İptal"
          checkedColor={colors.darkRed}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={darkRedCheckboxChecked}
          onPress={() => {
            setDarkRedCheckboxChecked(prev => {
              if (prev) {
                return false;
              } else {
                setRedCheckboxChecked(false);
                setBlueCheckboxChecked(false);
                setGreenCheckboxChecked(false);
                return true;
              }
            });
          }}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  checkboxText: {
    fontSize: 14,
    fontFamily: "Airbnb-Light",
    fontWeight: "normal"
  }
});

//make this component available to the app
export default CheckboxGroup;
