//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";

// CUSTOM SEZIN COMPONENTS
import SezinButton from "../Buttons/SezinButton";
import SezinDescription from "../Typography/SezinDescription";
import { colors } from "../../assets/styles/colors";

// create a component
const SezinIzinInformationModal = props => {
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={() => props.onBackdropPress()}
      isVisible={props.isModalOpen}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.modalShadowContainer}>
        {props.izin && (
          <>
            <View style={styles.modalContainerTop}>
              <Text style={styles.textTop}>
                {props.izin.cancelDescription ? "İptal Durumu" : "Ret Durumu"}
              </Text>
            </View>
            {/* TINY LINE */}
            <View style={styles.tinyLine} />

            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text
                style={{
                  fontFamily: "Airbnb-Book",
                  color: colors.dark,
                  fontSize: 16
                }}
              >
                {props.izin.cancelDescription
                  ? "İptal Açıklaması"
                  : "Ret Açıklaması"}
              </Text>

              {/* DESCRIPTION */}
              <SezinDescription
                textStyle={{ paddingTop: 10 }}
                text={
                  props.izin.cancelDescription
                    ? props.izin.cancelDescription
                    : props.izin.rejectDescription
                }
              />
            </View>

            <View style={styles.buttonContainer}>
              <SezinButton
                onPress={props.onCloseButtonPressed}
                color={colors.middleDarkGray}
                overlayColor="#908F8F"
                text="Kapat"
                buttonTextStyle={{ fontSize: 17 }}
                buttonStyle={{ width: 140 }}
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modalShadowContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    elevation: 5
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
    fontSize: 20,
    color: colors.dark
  },
  tinyLine: {
    height: 0.35,
    backgroundColor: colors.middleDarkGray,
    width: "100%"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10
  }
});

SezinIzinInformationModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  headerText: PropTypes.string,
  description: PropTypes.string,
  descriptionTitle: PropTypes.string,
  onCloseButtonPressed: PropTypes.func
};

//make this component available to the app
export default React.memo(SezinIzinInformationModal);
