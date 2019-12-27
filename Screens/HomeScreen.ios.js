import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Modal from "react-native-modal";
import Toast, { DURATION } from "react-native-easy-toast";

// REDUX
import { connect, useSelector } from "react-redux";

// CUSTOM COMPONENTS
import SezinHeader from "../components/SezinHeader";
import SezinTitle from "../components/SezinTitle";
import SezinMainScroll from "../components/SezinMainScroll";
import SezinDescription from "../components/SezinDescription";
import SezinAnnouncements from "../components/SezinAnnouncements";
import SezinButton from "../components/SezinButton";
import SezinOrders from "../components/SezinOrders";
import { colors } from "../assets/styles/colors";
import SezinSingleBusinessOrder from "../components/SezinSingleBusinessOrder";
import SezinSingleAnnouncement from "../components/SezinSingleAnnouncement";

const HomeScreen = props => {
  const username = useSelector(state => state.AuthReducer.username);

  const toast = React.useRef(null);
  const [modalOrderOpen, setModalOrderOpen] = React.useState(false);
  const [modalAnnouncementOpen, setModalAnnouncementOpen] = React.useState(
    false
  );
  const [selectedOrder, setSelectedOrder] = React.useState({
    place: null,
    title: null,
    deadline: null,
    createdBy: "Berk Elmas",
    status: "Tamamlandı"
  });
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState({
    date: null,
    title: null,
    description: null
  });

  const openOrderModal = item => {
    setModalOrderOpen(true);
    setSelectedOrder(prev => ({
      ...prev,
      deadline: item.date,
      place: item.place,
      title: item.title
    }));
  };

  const openAnnouncementModal = item => {
    setModalAnnouncementOpen(true);
    setSelectedAnnouncement(prev => ({
      ...prev,
      date: item.date,
      title: item.title,
      content: item.content
    }));
  };

  React.useEffect(() => {
    const didBlurSubscription = props.navigation.addListener(
      "didFocus",
      payload => {
        if (props.navigation.getParam("toastText", null)) {
          toast.current.show(
            props.navigation.getParam("toastText", null),
            1000
          );
        }
      }
    );
    return () => didBlurSubscription.remove();
  }, [props.navigation.getParam("toastText", null)]);

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
        text="Merhaba Sana Nasıl Yardım Edebilirim, Berk?"
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

      <SezinAnnouncements onPress={item => openAnnouncementModal(item)} />

      <SezinButton
        onPress={() => props.navigation.navigate("AllAnnouncements")}
        containerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
        buttonTextStyle={{ fontSize: 22 }}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
      />

      {/* BUSINESS ORDERS PART */}
      <SezinTitle
        text="Üzerimdeki Görevler"
        textStyle={{ paddingHorizontal: 20, paddingBottom: 2, marginTop: 20 }}
      />
      <SezinDescription
        containerStyle={{ paddingHorizontal: 20 }}
        text="Buradan üzerinize atanmış son görevlerinize erişebilirsiniz."
      />

      <SezinOrders onPress={item => openOrderModal(item)} />
      <SezinButton
        onPress={() => props.navigation.navigate("BusinessOrders")}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
        containerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />

      <Modal
        animationIn="fadeInUpBig"
        onSwipeComplete={() => setModalOrderOpen(false)}
        swipeDirection={["down", "left", "right", "up"]}
        isVisible={modalOrderOpen}
      >
        <SezinSingleBusinessOrder {...selectedOrder} />
      </Modal>

      <Modal
        animationIn="fadeInUpBig"
        onSwipeComplete={() => setModalAnnouncementOpen(false)}
        swipeDirection={["down", "left", "right", "up"]}
        isVisible={modalAnnouncementOpen}
      >
        <SezinSingleAnnouncement {...selectedAnnouncement} />
      </Modal>

      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={styles.toastContainerStyle}
      />

      <View style={{ height: 50 }} />
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
    backgroundColor: colors.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

export default connect(mapStateToProps)(HomeScreen);
