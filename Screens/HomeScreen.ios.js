import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Notifications } from "expo";
import Modal from "react-native-modal";
import Toast from "react-native-easy-toast";

// REDUX
import { connect, useSelector } from "react-redux";

// CUSTOM COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinMainScroll from "../components/General/SezinMainScroll";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinAnnouncements from "../components/General/SezinAnnouncements";
import SezinButton from "../components/Buttons/SezinButton";
import SezinOrders from "../components/General/SezinOrders";
import { colors } from "../assets/styles/colors";
import SezinSingleAnnouncement from "../components/General/SezinSingleAnnouncement";

import { getAnnouncements } from "../services/announcement-service";
import { getBusinessOrdersOnMe } from "../services/business-order-service";
import { registerForPushNotificationsAsync } from "../services/push-notification-service";

const HomeScreen = props => {
  const fullName = useSelector(state => state.AuthReducer.fullName);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const userId = useSelector(state => state.AuthReducer.userId);

  const [firstName, setFirstName] = React.useState(null);

  // ANNOUNCEMENTS
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

  // BUSINESS ORDERS ON ME
  const [businessOrdersOnMe, setBusinessOrdersOnMe] = useState([]);
  const [loadingBusinessOrdersOnMe, setLoadingBusinessOrdersOnMe] = useState(
    false
  );

  // WORKAROUND TO MODIFY FULL NAME
  useEffect(() => {
    if (fullName) {
      setFirstName(fullName.split(" ")[0]);
    }
  }, [fullName]);
  const toast = useRef(null);
  const [toastColor, setToastColor] = useState(colors.green);
  const [modalAnnouncementOpen, setModalAnnouncementOpen] = useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState({
    date: null,
    title: null,
    description: null
  });

  const openAnnouncementModal = item => {
    setModalAnnouncementOpen(true);
    setSelectedAnnouncement(prev => ({
      ...prev,
      date: item.startDateValue,
      title: item.title,
      content: item.description
    }));
  };

  const getLastFiveAnnouncements = () => {
    if (accessToken) {
      setLoadingAnnouncements(true);
      getAnnouncements(1, 5, accessToken)
        .then(res => {
          setLoadingAnnouncements(false);
          setAnnouncements(res.data.result);
        })
        .catch(console.log);
    }
  };

  const getLastFourBusinessOrdersOnMe = () => {
    if (accessToken) {
      console.log(accessToken);
      setLoadingBusinessOrdersOnMe(true);
      getBusinessOrdersOnMe(1, 4, accessToken)
        .then(res => {
          if (!res.data.hasError) {
            setBusinessOrdersOnMe(res.data.result);
          }
          setLoadingBusinessOrdersOnMe(false);
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    const didBlurSubscription = props.navigation.addListener(
      "didFocus",
      payload => {
        // get last five announcements.
        getLastFiveAnnouncements();
        // get last four business orders on me.
        getLastFourBusinessOrdersOnMe();

        if (props.navigation.getParam("toastText", null)) {
          setToastColor(props.navigation.getParam("toastColor", null));
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

  // GET ANNOUNCEMENTS ON ACCES TOKEN CHANGE
  // IT COMES AS NULL AT THE BEGINNING.
  React.useEffect(() => {
    getLastFiveAnnouncements();
    getLastFourBusinessOrdersOnMe();
  }, [accessToken]);

  useEffect(() => {
    if (userId) {
      registerForPushNotificationsAsync(userId)
        .then(res => {
          console.log("TOKEN KAYDI BASARILI...");
        })
        .catch(console.log);
    }
  }, [userId]);

  useEffect(() => {
    const _notificationSubscription = Notifications.addListener(() =>
      console.log("Notification geldi...")
    );
    return () => {
      _notificationSubscription.remove();
    };
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* HEADER PART */}
      <SezinHeader
        onPressLeft={() => props.navigation.toggleDrawer()}
        leftIconName="bars"
        containerStyle={{ marginHorizontal: 20, paddingTop: 20 }}
      />

      {/* FIRST TITLE PART */}
      <SezinTitle
        text={"Merhaba Sana Nasıl Yardım Edebilirim, " + firstName + "?"}
        textStyle={{ fontSize: 30, paddingHorizontal: 20, paddingBottom: 13 }}
      />

      {/* MAIN SCROLL PART */}
      <SezinMainScroll
        onPress={link => link && props.navigation.navigate(link)}
      />

      {/* ANNOUNCEMENTS PART */}
      <SezinTitle
        text="Son Duyurular"
        textStyle={{ fontSize: 30, paddingHorizontal: 20, paddingBottom: 2 }}
      />
      <SezinDescription
        containerStyle={{ paddingHorizontal: 20 }}
        text="Şirket içi son bildirimlere buradan ulaşabilirsiniz. Tüm bildirimler için aşağıdaki butona tıklayabilirsiniz."
      />

      <SezinAnnouncements
        loading={loadingAnnouncements}
        announcementsData={announcements}
        onPress={item => openAnnouncementModal(item)}
      />

      <SezinButton
        onPress={() => props.navigation.navigate("AllAnnouncements")}
        containerStyle={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20
        }}
        buttonTextStyle={{ fontSize: 22 }}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
      />

      {/* BUSINESS ORDERS PART */}
      <SezinTitle
        text="Üzerimdeki Görevler"
        textStyle={{ paddingHorizontal: 20, paddingBottom: 2 }}
      />
      <SezinDescription
        containerStyle={{ paddingHorizontal: 20 }}
        text="Buradan üzerinize atanmış son görevlerinize erişebilirsiniz."
      />

      <SezinOrders
        loading={loadingBusinessOrdersOnMe}
        businessOrders={businessOrdersOnMe}
      />
      <SezinButton
        onPress={() => props.navigation.navigate("BusinessOrders")}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
        containerStyle={{
          paddingHorizontal: 20,
          marginTop: 20,
          paddingBottom: 40
        }}
      />

      <Modal
        useNativeDriver={true}
        animationIn="fadeInUpBig"
        onSwipeComplete={() => setModalAnnouncementOpen(false)}
        onBackdropPress={() => setModalAnnouncementOpen(false)}
        swipeDirection={["down", "left", "right", "up"]}
        isVisible={modalAnnouncementOpen}
        hideModalContentWhileAnimating={true}
      >
        <SezinSingleAnnouncement {...selectedAnnouncement} />
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

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
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

export default connect()(HomeScreen);
