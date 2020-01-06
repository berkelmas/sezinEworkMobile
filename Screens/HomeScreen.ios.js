import React from "react";
import { StyleSheet, ScrollView } from "react-native";
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
import SezinSingleBusinessOrder from "../components/General/SezinSingleBusinessOrder";
import SezinSingleAnnouncement from "../components/General/SezinSingleAnnouncement";

const HomeScreen = props => {
  const fullName = useSelector(state => state.AuthReducer.fullName);
  const [firstName, setFirstName] = React.useState(null);

  // WORKAROUND TO MODIFY FULL NAME
  React.useEffect(() => {
    if (fullName) {
      setFirstName(fullName.split(" ")[0]);
    }
  }, [fullName]);
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
        console.log(props.navigation.getParam("toastText", null));
        if (props.navigation.getParam("toastText", null)) {
          toast.current.show(
            props.navigation.getParam("toastText", null),
            1000
          );
          props.navigation.setParams({ toastText: null });
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

      <SezinAnnouncements onPress={item => openAnnouncementModal(item)} />

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

      <SezinOrders onPress={item => openOrderModal(item)} />
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
        onSwipeComplete={() => setModalOrderOpen(false)}
        swipeDirection={["down", "left", "right", "up"]}
        isVisible={modalOrderOpen}
      >
        <SezinSingleBusinessOrder {...selectedOrder} />
      </Modal>

      <Modal
        useNativeDriver={true}
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
        style={{
          ...styles.toastContainerStyle,
          backgroundColor: props.navigation.getParam("toastColor", null)
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
