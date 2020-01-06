//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

// CUSTOM SEZIN COMPONENTS
import SezinButton from "../Buttons/SezinButton";
import SezinLoadingButton from "../Buttons/SezinLoadingButton";
import SezinDescription from "../Typography/SezinDescription";
import SezinInput from "../Inputs/SezinInput";
import { colors } from "../../assets/styles/colors";

// create a component
const GetInfoBeforeActionModal = props => {
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={() => props.onBackdropPress()}
      isVisible={props.isModalOpen}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss.bind()}>
          <View style={{ ...styles.modalView }}>
            <View style={styles.modalContainerTop}>
              <Text style={styles.textTop}>{props.headerText}</Text>
            </View>
            {/* TINY LINE */}
            <View style={styles.tinyLine} />

            <View
              keyboardDismissMode="on-drag"
              style={styles.modalContainerBottom}
            >
              <SezinDescription
                text={props.descriptionText}
                textStyle={styles.textDescription}
              />
              <SezinInput
                label={props.inputLabel}
                multiline={true}
                onChangeText={text => props.onChangeModalText(text)}
              />

              <View style={styles.bottomButtonsContainer}>
                <SezinButton
                  onPress={() => props.onCloseButtonPressed()}
                  color={colors.middleDarkGray}
                  overlayColor="#908F8F"
                  text="Kapat"
                  buttonTextStyle={{ fontSize: 20 }}
                  buttonStyle={{ width: 140 }}
                />
                <SezinLoadingButton
                  loading={props.loadingApproveButton}
                  onPress={() => props.onApproveButtonPressed()}
                  color={props.approveButtonColor}
                  overlayColor={props.approveButtonHighlightColor}
                  text={props.approveButtonText}
                  buttonTextStyle={{
                    fontSize: 20
                  }}
                  buttonStyle={{ width: 140 }}
                  buttonHeight={26}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "8%"
  }
});

GetInfoBeforeActionModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onChangeModalText: PropTypes.func,
  onCloseButtonPressed: PropTypes.func,
  onApproveButtonPressed: PropTypes.func,
  loadingApproveButton: PropTypes.bool,
  approveButtonColor: PropTypes.string,
  approveButtonHighlightColor: PropTypes.string,
  descriptionText: PropTypes.string,
  inputLabel: PropTypes.string,
  headerText: PropTypes.string,
  approveButtonText: PropTypes.string
};

//make this component available to the app
export default GetInfoBeforeActionModal;
