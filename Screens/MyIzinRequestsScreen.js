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
import SezinSingleIzin from "../components/General/SezinSingleIzin";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinButton from "../components/Buttons/SezinButton";

import { izinlerData } from "../assets/data/izinler.data";

// create a component
const MyIzinRequestsScreen = props => {
  const [izinRequests, setIzinRequests] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelRequestLoading, setCancelRequestLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setIzinRequests(izinlerData.slice(0, 3));
      setLoadingState(false);
    }, 1000);
  }, []);

  const _loadData = () => {
    setLoadingState(true);
    setTimeout(() => {
      setIzinRequests(prev => [...prev, ...izinlerData.slice(3, 6)]);
      setLoadingState(false);
    }, 1500);
  };

  const sendCancelRequest = () => {
    setCancelRequestLoading(true);
    setTimeout(() => {
      setCancelRequestLoading(false);
      setIsCancelModalOpen(false);
      toast.current.show("İzin talebi iptali başarılı", 1000);
    }, 1500);
  };

  return (
    <>
      <FlatList
        data={izinRequests}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <SezinSingleIzin
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            onCancelRequest={setIsCancelModalOpen.bind(this, true)}
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
            <SezinTitle text="İzin Taleplerim" />
            <SezinDescription
              text="Buradan talep etmiş olduğunuz tüm izinlere erişebilirsiniz."
              textStyle={{ paddingBottom: 20 }}
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
      <Modal
        useNativeDriver={true}
        onBackdropPress={() => setIsCancelModalOpen(false)}
        isVisible={isCancelModalOpen}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss.bind()}>
            <View style={{ ...styles.modalView }}>
              <View
                style={{
                  backgroundColor: "white",
                  height: 45,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontFamily: "Airbnb-Light", fontSize: 20 }}>
                  İzin Talebi İptali
                </Text>
              </View>
              {/* TINY LINE */}
              <View
                style={{ height: 0.4, backgroundColor: "gray", width: "100%" }}
              />
              <View
                keyboardDismissMode="on-drag"
                style={{
                  backgroundColor: "white",
                  paddingVertical: 15,
                  paddingHorizontal: 10
                }}
              >
                <SezinDescription
                  text="İzin talebinizi iptal etmek istediğinize emin misiniz?"
                  textStyle={{
                    fontSize: 17 / PixelRatio.getFontScale(),
                    color: colors.dark,
                    paddingBottom: 15
                  }}
                />
                <SezinInput
                  label="İptal Gerekçesi"
                  multiline={true}
                  onChangeText={() => console.log("berk")}
                />

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: "8%"
                  }}
                >
                  <SezinButton
                    onPress={() => setIsCancelModalOpen(false)}
                    color={colors.middleDarkGray}
                    overlayColor="#908F8F"
                    text="Kapat"
                    buttonTextStyle={{ fontSize: 20 }}
                    buttonStyle={{ width: 140 }}
                  />
                  <SezinLoadingButton
                    loading={cancelRequestLoading}
                    onPress={() => sendCancelRequest()}
                    color={colors.red}
                    overlayColor={colors.darkRed}
                    text="İptal Et"
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

      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={{
          ...styles.toastContainerStyle,
          // backgroundColor: props.navigation.getParam("toastColor", null)
          backgroundColor: colors.green
        }}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20
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

MyIzinRequestsScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default MyIzinRequestsScreen;
