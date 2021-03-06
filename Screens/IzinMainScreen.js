//import liraries
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView, PixelRatio } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-easy-toast";
import { DotIndicator } from "react-native-indicators";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinMainIzinScroll from "../components/General/SezinMainIzinScroll";
import SezinIzinler from "../components/General/SezinIzinler";
import SezinButton from "../components/Buttons/SezinButton";
import SezinSingleIzin from "../components/General/SezinSingleIzin";

import { colors } from "../assets/styles/colors";
import { getTotalIzin, getOwnIzinRequests } from "../services/izin-service";
import { useSelector } from "react-redux";

// create a component
const IzinMainScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const toast = useRef(null);
  const [toastColor, setToastColor] = useState(colors.green);

  // SELECTED IZIN FOR MODAL DISPLAY
  const [selectedIzin, setselectedIzin] = useState(null);
  const [modalIzinOpen, setModalIzinOpen] = useState(false);

  // TOTAL IZIN COUNT
  const [totalIzinCount, setTotalIzinCount] = useState(null);
  const [totalIzinCountLoading, setTotalIzinCountLoading] = useState(false);

  // LAST 4 IZIN REQUESTS
  const [lastFourIzinRequests, setLastFourIzinRequests] = useState([]);
  const [
    lastFourIzinRequestsLoading,
    setLastFourIzinRequestsLoading
  ] = useState(false);

  const openModal = izin => {
    setselectedIzin(izin);
    setModalIzinOpen(true);
  };

  useEffect(() => {
    // REACT NAVIGATION PAGE SUBSCRIPTION
    const didBlurSubscription = props.navigation.addListener(
      "didFocus",
      payload => {
        // GET TOTAL IZIN COUNT
        setTotalIzinCountLoading(true);
        getTotalIzin(accessToken)
          .then(res => {
            setTotalIzinCount(res.data.result);
            setTotalIzinCountLoading(false);
          })
          .catch(err => {
            setTotalIzinCountLoading(false);
          });

        // setLastFourIzinRequestsLoading(true);
        getOwnIzinRequests(1, 4, accessToken)
          .then(res => {
            setLastFourIzinRequestsLoading(false);
            setLastFourIzinRequests(res.data.result);
          })
          .catch(err => setLastFourIzinRequests(false));

        if (props.navigation.getParam("toastText", null)) {
          // setToastColor(props.navigation.getParam("toastColor", null));
          console.log(props.navigation.getParam("toastText", null));
          toast.current.show(
            props.navigation.getParam("toastText", null),
            1000
          );
          props.navigation.setParams({ toastText: null });
          props.navigation.setParams({ toastColor: null });
        }
      }
    );
    return () => didBlurSubscription.remove();
  });

  // GET FIRST IZIN COUNT.
  useEffect(() => {
    // GET TOTAL IZIN COUNT
    setTotalIzinCountLoading(true);
    getTotalIzin(accessToken)
      .then(res => {
        setTotalIzinCount(res.data.result);
        setTotalIzinCountLoading(false);
      })
      .catch(err => {
        setTotalIzinCountLoading(false);
      });

    setLastFourIzinRequestsLoading(true);
    getOwnIzinRequests(1, 4, accessToken)
      .then(res => {
        console.log(res.data.result[0]);
        setLastFourIzinRequestsLoading(false);
        setLastFourIzinRequests(res.data.result);
      })
      .catch(err => setLastFourIzinRequests(false));
  }, []);

  useEffect(() => {
    console.log("selectedizin", selectedIzin);
  }, [selectedIzin]);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER PART */}
      <SezinHeader
        onPressLeft={() => props.navigation.toggleDrawer()}
        leftIconName="bars"
        containerStyle={{ marginHorizontal: 20, paddingTop: 20 }}
      />
      <SezinTitle
        text="İzin Yönetimi"
        textStyle={{ paddingHorizontal: 20, paddingBottom: 5 }}
      />
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        {totalIzinCountLoading ? (
          <View style={{ marginLeft: 10, paddingVertical: 3 }}>
            <DotIndicator color={colors.green} size={7} />
          </View>
        ) : (
          <>
            <SezinDescription
              text={`${totalIzinCount} günlük`}
              textStyle={{ color: colors.green }}
            />
            <SezinDescription text=" yıllık izin hakkınız bulunmaktadır." />
          </>
        )}
      </View>

      <SezinMainIzinScroll onPress={props.navigation.navigate.bind(this)} />

      <SezinTitle
        text="Son İzin Taleplerim"
        textStyle={{ marginHorizontal: 20, paddingTop: 10 }}
      />
      <SezinDescription
        text="Buradan talep etmiş olduğunuz son izinlere erişebilirsiniz."
        textStyle={{ marginHorizontal: 20 }}
      />

      <SezinIzinler
        loading={lastFourIzinRequestsLoading}
        izinler={lastFourIzinRequests}
        onIzinPress={izin => openModal(izin)}
      />

      <SezinButton
        onPress={props.navigation.navigate.bind(this, "MyIzinRequests")}
        containerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
        buttonTextStyle={{ fontSize: 22 / PixelRatio.getFontScale() }}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
      />
      <View style={{ height: 50, width: 100 }} />

      {/* MODAL AND TOAST COMPONENTS HERE. */}
      <Modal
        useNativeDriver={true}
        animationIn="fadeInUpBig"
        onSwipeComplete={() => setModalIzinOpen(false)}
        onBackdropPress={() => setModalIzinOpen(false)}
        swipeDirection={["down", "left", "right", "up"]}
        isVisible={modalIzinOpen}
        hideModalContentWhileAnimating={true}
      >
        <SezinSingleIzin
          buttonsNotRendered={true}
          buttonRendered={false}
          {...selectedIzin}
        />
      </Modal>

      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={{
          ...styles.toastContainerStyle,
          backgroundColor: toastColor
        }}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  toastText: {
    fontFamily: "Airbnb-Book",
    color: "white",
    fontSize: 16 / PixelRatio.getFontScale()
  },
  toastContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

IzinMainScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default IzinMainScreen;
