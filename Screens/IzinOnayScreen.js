//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  PixelRatio,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";
import Toast from "react-native-easy-toast";
import Modal from "react-native-modal";

import { colors } from "../assets/styles/colors";

// CUSTOM SEZIN COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleIzinOptions from "../components/General/SezinSingleIzinOptions";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinButton from "../components/Buttons/SezinButton";
import GetInfoBeforeActionModal from "../components/Modal/GetInfoBeforeActionModal";

import { izinlerOnayData } from "../assets/data/izinler.data";
import AskAgainBeforeActionModal from "../components/Modal/AskAgainBeforeActionModal";

// create a component
const IzinOnayScreen = props => {
  const [izinRequests, setIzinRequests] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [approveRequestLoading, setApproveRequestLoading] = useState(false);
  const [denyRequestLoading, setDenyRequestLoading] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setIzinRequests(izinlerOnayData.slice(0, 3));
      setLoadingState(false);
    }, 1000);
  }, []);

  const _loadData = () => {
    setLoadingState(true);
    setTimeout(() => {
      setIzinRequests(prev => [...prev, ...izinlerOnayData.slice(3, 6)]);
      setLoadingState(false);
    }, 1500);
  };

  const sendDenyRequest = () => {
    setDenyRequestLoading(true);
    setTimeout(() => {
      setDenyRequestLoading(false);
      setIsDenyModalOpen(false);
      toast.current.show("İzin talebi reddi başarılı", 1000);
    }, 1500);
  };

  const sendApproveRequest = () => {
    setApproveRequestLoading(true);
    setTimeout(() => {
      setApproveRequestLoading(false);
      setIsApproveModalOpen(false);
      toast.current.show("İzin talebi onayı başarılı", 1000);
    }, 1500);
  };

  return (
    <>
      <FlatList
        data={izinRequests}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <SezinSingleIzinOptions
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            onDenyRequest={() => setIsDenyModalOpen(true)}
            onApproveRequest={() => setIsApproveModalOpen(true)}
            approveLoading={false}
            denyLoading={false}
            {...item}
          />
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={_loadData.bind(this)}
        ListHeaderComponent={() => (
          <View>
            {/* HEADER PART */}
            <SezinHeader
              onPressLeft={() => props.navigation.goBack()}
              leftIconName="chevron-left"
            />
            <SezinTitle text="İzin Talebi Onayı" />
            <SezinDescription
              text="Buradan onay veya ret işleminde bulunmanız gereken izin taleplerine 
              ulaşabilirsiniz."
            />
          </View>
        )}
        ListFooterComponent={() => {
          if (loadingState) {
            return (
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "white",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <MaterialIndicator color={colors.blue} size={50} />
              </View>
            );
          } else {
            return null;
          }
        }}
      />

      <GetInfoBeforeActionModal
        isModalOpen={isDenyModalOpen}
        onBackdropPress={() => setIsDenyModalOpen(false)}
        onChangeModalText={text => console.log(text)}
        onCloseButtonPressed={() => setIsDenyModalOpen(false)}
        onApproveButtonPressed={() => sendDenyRequest()}
        loadingApproveButton={denyRequestLoading}
        approveButtonColor={colors.red}
        approveButtonHighlightColor={colors.darkRed}
        descriptionText="Personelin izin talebini reddetmek istediğinize emin misiniz?"
        inputLabel="Ret Gerekçesi"
        headerText="İzin Talebi Reddet"
        approveButtonText="Reddet"
      />
      <AskAgainBeforeActionModal
        isModalOpen={isApproveModalOpen}
        onBackdropPress={() => setIsApproveModalOpen(false)}
        onCloseButtonPressed={() => setIsApproveModalOpen(false)}
        onApproveButtonPressed={() => sendApproveRequest()}
        loadingApproveButton={approveRequestLoading}
        approveButtonColor={colors.green}
        approveButtonHighlightColor={colors.darkGreen}
        descriptionText="Personelin izin talebini onaylamak istediğinize emin misiniz?"
        headerText="İzin Talebi Onayla"
        approveButtonText="Onayla"
      />
      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={{
          ...styles.toastContainerStyle,
          backgroundColor: colors.green
        }}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 4,
    width: (Dimensions.get("window").width * 9) / 10,
    overflow: "hidden"
  },
  toastText: {
    fontFamily: "Airbnb-Book",
    color: "white",
    fontSize: 16
  },
  toastContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

IzinOnayScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default IzinOnayScreen;
