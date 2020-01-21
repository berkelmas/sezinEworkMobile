//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Tooltip } from "react-native-elements";
import { colors } from "../../assets/styles/colors";

// create a component
const CustomTooltipOnWordCount = props => {
  return (
    <View>
      {props.text.length > props.maxLength ? (
        <Tooltip
          containerStyle={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.15,
            shadowRadius: 7,

            elevation: 9
          }}
          height={40 + 3 * 20}
          width={200}
          backgroundColor={colors.lightGray}
          popover={
            <View>
              <Text
                style={{
                  fontFamily: "Airbnb-Light",
                  fontSize: 15,
                  color: colors.dark
                }}
              >
                {props.text}
              </Text>
            </View>
          }
        >
          <Text style={props.titleStyle}>
            {props.text
              .split("")
              .slice(0, props.maxLength)
              .join("") + "..."}
          </Text>
        </Tooltip>
      ) : (
        <Text style={props.titleStyle}>{props.text}</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

CustomTooltipOnWordCount.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object
};

//make this component available to the app
export default CustomTooltipOnWordCount;
