//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  notStarted,
  notStartedToWorkingOn,
  workingToCompleted,
  cancelled
} from "../Micro/SezinBusinessOrderIcons";
import { colors } from "../../assets/styles/colors";

// create a component
const BusinessOrderActivities = props => {
  return (
    <View>
      {props.activity.map(item => (
        <View key={item.personId} style={{ padding: 10 }}>
          <Text style={styles.personText}>{item.person}</Text>
          {/* MAIN CONTAINER */}
          <View style={{ paddingHorizontal: 10 }}>
            {/* CANCEL */}
            {item.cancel && item.cancel.length > 0 && (
              <View>
                {cancelled()}
                {item.cancel.map((text, index) => (
                  <Text key={index} style={styles.singleActivityText}>
                    - {text}
                  </Text>
                ))}
              </View>
            )}

            {/* NOT STARTED */}
            {item.notStarted && item.notStarted.length > 0 && (
              <View>
                {notStarted()}
                {item.notStarted.map((text, index) => (
                  <Text key={index} style={styles.singleActivityText}>
                    - {text}
                  </Text>
                ))}
              </View>
            )}
            <View style={{ height: 5, width: 50 }} />
            {/* NOT STARTED TO WORKING */}
            {item.notStartedToWorking && item.notStartedToWorking.length > 0 && (
              <View>
                {notStartedToWorkingOn()}
                {item.notStartedToWorking.map((text, index) => (
                  <Text key={index} style={styles.singleActivityText}>
                    - {text}
                  </Text>
                ))}
              </View>
            )}
            <View style={{ height: 5, width: 50 }} />
            {/* WORKING TO DONE */}
            {item.workingToDone && item.workingToDone.length > 0 && (
              <View>
                {workingToCompleted()}
                {item.workingToDone.map((text, index) => (
                  <Text key={index} style={styles.singleActivityText}>
                    - {text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  personText: {
    fontFamily: "Airbnb-Book",
    fontSize: 20,
    color: colors.dark
  },
  singleActivityText: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: "Airbnb-Light"
  }
});

BusinessOrderActivities.propTypes = {
  activity: PropTypes.arrayOf(
    PropTypes.shape({
      person: PropTypes.string,
      personId: PropTypes.string,
      currentStatus: PropTypes.string,
      notStarted: PropTypes.arrayOf(PropTypes.string),
      notStartedToWorking: PropTypes.arrayOf(PropTypes.string),
      workingToDone: PropTypes.arrayOf(PropTypes.string),
      cancel: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

//make this component available to the app
export default BusinessOrderActivities;
