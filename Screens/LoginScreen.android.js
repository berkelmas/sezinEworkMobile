import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// REDUX
import { connect, useSelector } from "react-redux";

// CUSTOM COMPONENTS
import SezinHeader from "../components/SezinHeader";
import SezinTitle from "../components/SezinTitle";
import SezinMainScroll from "../components/SezinMainScroll";
import SezinDescription from "../components/SezinDescription";
import SezinNotifications from "../components/SezinNotifications";
import SezinButton from "../components/SezinButton";
import SezinOrders from "../components/SezinOrders";
import { colors } from "../assets/styles/colors";

const HomeScreen = props => {
  const username = useSelector(state => state.AuthReducer.username);

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
      <SezinMainScroll />

      {/* DUYURULAR PART */}
      <SezinTitle
        text="Son Duyurular"
        textStyle={{ fontSize: 30, paddingHorizontal: 20, paddingBottom: 2 }}
      />
      <SezinDescription
        containerStyle={{ paddingHorizontal: 20 }}
        text="Şirket içi son bildirimlere buradan ulaşabilirsiniz. Tüm bildirimler için aşağıdaki butona tıklayabilirsiniz."
      />

      <SezinNotifications />

      <SezinButton
        onPress={() => console.log("Berkelmas")}
        containerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
        buttonTextStyle={{ fontSize: 22 }}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
      />

      <SezinTitle
        text="Üzerimdeki Görevler"
        textStyle={{ paddingHorizontal: 20, paddingBottom: 2, marginTop: 20 }}
      />
      <SezinDescription
        containerStyle={{ paddingHorizontal: 20 }}
        text="Buradan üzerinize atanmış son görevlerinize erişebilirsiniz."
      />

      <SezinOrders />
      <SezinButton
        onPress={() => console.log("Berkelmas")}
        color={colors.green}
        overlayColor={colors.darkGreen}
        text="Tümünü Gör"
        containerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {}
});

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

export default connect(mapStateToProps)(HomeScreen);
