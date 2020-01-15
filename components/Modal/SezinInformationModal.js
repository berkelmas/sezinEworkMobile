//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  PixelRatio,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import IcomoonIcon from "../Typography/IcomoonIcon";

// CUSTOM SEZIN COMPONENTS
import SezinButton from "../Buttons/SezinButton";
import SezinDescription from "../Typography/SezinDescription";
import {
  notStartedToWorkingOn,
  notStarted,
  startedToCompleted
} from "../Micro/SezinBusinessOrderIcons";
import { colors } from "../../assets/styles/colors";
import { MaterialIndicator } from "react-native-indicators";
import BusinessOrderActivities from "../Micro/BusinessOrderActivities";

// create a component
const SezinInformationModal = props => {
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={() => props.onBackdropPress()}
      isVisible={props.isModalOpen}
    >
      <View style={{ height: 500, backgroundColor: "white" }}>
        <View style={styles.modalContainerTop}>
          <Text style={styles.textTop}>{props.headerText}</Text>
        </View>
        {/* TINY LINE */}
        <View style={styles.tinyLine} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            padding: 10
          }}
        >
          {/* CONTENT COME HERE... */}
          <SezinDescription text="Buradan iş emrine dahil olan personellerin iş hareketlerini görüntüleyebilirsiniz." />
          {props.loadingState ? (
            <View
              style={{
                height: 300,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <MaterialIndicator size={50} color={colors.blue} />
            </View>
          ) : (
            <BusinessOrderActivities activity={props.activitiesArray} />
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10
          }}
        >
          <SezinButton
            onPress={() => props.onCloseButtonPressed()}
            color={colors.middleDarkGray}
            overlayColor="#908F8F"
            text="Kapat"
            buttonTextStyle={{ fontSize: 17 }}
            buttonStyle={{ width: 140 }}
          />
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 4,
    width: (Dimensions.get("window").width * 9) / 10,
    overflow: "hidden"
  },
  modalContainerTop: {
    backgroundColor: "white",
    height: 45,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center"
  },
  textTop: {
    fontFamily: "Airbnb-Light",
    fontSize: 20
  },
  tinyLine: {
    height: 0.4,
    backgroundColor: "gray",
    width: "100%"
  },
  modalContainerBottom: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  textDescription: {
    fontSize: 17 / PixelRatio.getFontScale(),
    color: colors.dark,
    paddingBottom: 15
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "8%"
  }
});

SezinInformationModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onCloseButtonPressed: PropTypes.func,
  descriptionComponent: PropTypes.element,
  headerText: PropTypes.string,
  loadingState: PropTypes.bool
};

//make this component available to the app
export default SezinInformationModal;
