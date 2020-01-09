//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PixelRatio,
  ViewPropTypes
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import IcomoonIcon from "../Typography/IcomoonIcon";
import { colors } from "../../assets/styles/colors";
import { render } from "react-dom";

// create a component
class SezinTimePicker extends React.Component {
  state = {
    date: new Date(new Date().setFullYear(2040)),
    mode: "date",
    show: false,
    everSelected: false
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
      everSelected: true
    });
    this.props.onValueChange(date);
  };

  show = mode => {
    this.setState({
      show: true,
      mode
    });
  };

  datepicker = () => {
    this.show("date");
  };

  timepicker = () => {
    this.show("time");
  };

  render() {
    const { show, date, mode, everSelected } = this.state;

    return (
      <View
        style={{ ...styles.container, ...this.props.contentContainerStyle }}
      >
        <TouchableOpacity
          onPress={this.timepicker}
          style={{
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1.2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={styles.textStyle}>
            {everSelected
              ? `${
                  date.getHours().toString().length < 2
                    ? "0" + date.getHours().toString()
                    : date.getHours()
                }.${
                  date.getMinutes().toString().length < 2
                    ? "0" + date.getMinutes().toString()
                    : date.getMinutes()
                }`
              : this.props.placeholderText}
          </Text>
          <IcomoonIcon
            name="chevron-down"
            size={25}
            style={{ paddingRight: 5, paddingBottom: 5 }}
            color={colors.dark}
          />
        </TouchableOpacity>
        {show ? (
          <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            onChange={this.setDate}
          />
        ) : null}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 35
  },
  textStyle: {
    fontSize: 17 / PixelRatio.getFontScale(),
    paddingLeft: 2,
    color: colors.dark,
    paddingBottom: 6,
    fontFamily: "Airbnb-Book"
  }
});

SezinTimePicker.propTypes = {
  onValueChange: PropTypes.func,
  placeholderText: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style
};

//make this component available to the app
export default SezinTimePicker;
