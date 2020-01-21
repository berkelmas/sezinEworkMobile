//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import SezinHeader from "../components/General/SezinHeader";
import SezinButton from "../components/Buttons/SezinButton";
import CustomTooltipOnWordCount from "../components/Typography/CustomTooltipOnWordCount";
import { colors } from "../assets/styles/colors";
import { useSelector } from "react-redux";

// create a component
const ProfileScreen = props => {
  const user = useSelector(state => state.AuthReducer);

  return (
    <View style={styles.container}>
      {/* HEADER PART */}
      <SezinHeader
        onPressLeft={() => props.navigation.toggleDrawer()}
        leftIconName="bars"
        containerStyle={{ marginHorizontal: 20, paddingTop: 20 }}
      />
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: colors.blue,
            borderRadius: 125,
            height: Dimensions.get("window").height / 4,
            width: Dimensions.get("window").height / 4,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: colors.blue,
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,

            elevation: 8
          }}
        >
          <View
            style={{
              backgroundColor: "#f7f7f7",
              borderRadius: 115,
              height: (Dimensions.get("window").height * 9) / 40,
              width: (Dimensions.get("window").height * 9) / 40,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <Text
              style={{
                color: colors.gray,
                fontFamily: "Airbnb-Light",
                fontSize: 100
              }}
            >
              {user.fullName.split(" ")[0][0] +
                user.fullName.split(" ")[
                  user.fullName.split(" ").length - 1
                ][0]}
            </Text>
          </View>
        </View>
      </View>

      {/* BOTTOM PART */}
      <View
        style={{
          flex: 5,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 30,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* BOTTOM CARD */}
        <View
          style={{
            height: "90%",
            width: "100%",
            padding: 10,
            backgroundColor: "white",
            shadowColor: colors.dark,
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,

            elevation: 20,
            borderRadius: 4,
            justifyContent: "space-evenly"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Airbnb-Book",
                color: colors.dark
              }}
            >
              Ad-Soyad
            </Text>
            <CustomTooltipOnWordCount
              titleStyle={{
                fontSize: 18,
                fontFamily: "Airbnb-Light",
                color: colors.dark
              }}
              maxLength={14}
              text={user.fullName}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Airbnb-Book",
                color: colors.dark
              }}
            >
              Email
            </Text>
            <CustomTooltipOnWordCount
              titleStyle={{
                fontSize: 18,
                fontFamily: "Airbnb-Light",
                color: colors.dark
              }}
              maxLength={18}
              text={user.userEmail}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Airbnb-Book",
                color: colors.dark
              }}
            >
              Kullanıcı Grubu
            </Text>
            <CustomTooltipOnWordCount
              titleStyle={{
                fontSize: 18,
                fontFamily: "Airbnb-Light",
                color: colors.dark
              }}
              maxLength={14}
              text={user.userGroup}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Airbnb-Book",
                color: colors.dark
              }}
            >
              Hastane
            </Text>

            <CustomTooltipOnWordCount
              titleStyle={{
                fontSize: 18,
                fontFamily: "Airbnb-Light",
                color: colors.dark
              }}
              maxLength={14}
              text={user.userHospitalName}
            />
          </View>

          <SezinButton
            color={colors.blue}
            overlayColor={colors.darkBlue}
            text="Şifre Değiştir"
            onPress={props.navigation.navigate.bind(this, "ChangePassword")}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

ProfileScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default ProfileScreen;
