import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

// ASSETS
import { colors } from "../assets/styles/colors";
import SezinLogo from "../assets/images/sezin-logo.png";
import DigriseLogo from "../assets/images/digrise-logo.png";

// NATIVE BASE
import { Item, Input, Label } from "native-base";

// CUSTOM COMPONENTS
import SezinButton from "../components/SezinButton";
import SezinInput from "../components/SezinInput";

const LoginScreen = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* TOP LOGO AND TEXT */}
        <View style={{ height: 100 }} />
        <View>
          <Image
            source={SezinLogo}
            style={{ height: 90, width: 90, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.headerTextBig}>Merhaba</Text>
        <Text style={styles.headerTextSmall}>E-Work'e Giriş Yapın</Text>

        {/* FORM CONTAINER */}
        <View style={{ paddingTop: 40 }}>
          {/* EMAIL */}
          <SezinInput label="Email" />

          {/* PASSWORD */}
          <SezinInput
            label="Şifre"
            secureEntry={true}
            containerStyle={{ marginTop: 10 }}
          />
        </View>

        {/* INLINE BLOCK WORK-AROUND FOR RN */}
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <SezinButton
            onPress={() => props.navigation.navigate("Home")}
            color={colors.blue}
            overlayColor={colors.darkBlue}
            text="Giriş Yap"
          />

          {/* BOTTOM TEXT */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.footerTextTop}>Sorun mu yaşıyorsunuz?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("GetHelp")}
            >
              <Image
                source={DigriseLogo}
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  paddingVertical: 55
                }}
              />
            </TouchableOpacity>
            <Text style={styles.footerTextBottom}>
              Yukarıdaki linke tıklayarak
              {"\n"}
              <Text style={styles.footerTextBottomBlue}>Sistem Yöneticisi</Text>
              'ne ulaşabilirsiniz.
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerTextBig: {
    fontFamily: "Airbnb-Book",
    fontSize: 35,
    color: colors.dark,
    paddingTop: 10
  },
  headerTextSmall: {
    fontFamily: "Airbnb-Book",
    fontSize: 25,
    color: colors.gray
  },
  labelStyle: {
    fontFamily: "Airbnb-Book",
    fontSize: 17,
    color: colors.dark
  },
  inputStyle: {
    fontFamily: "Airbnb-Light",
    color: colors.dark
  },
  forgotPassword: {
    fontFamily: "Airbnb-Light",
    fontSize: 14,
    paddingVertical: 8,
    color: colors.dark
  },
  footerTextTop: {
    fontFamily: "Airbnb-Light",
    fontSize: 15,
    color: colors.dark
  },
  footerTextBottom: {
    textAlign: "center",
    fontFamily: "Airbnb-Light",
    fontSize: 13,
    color: colors.dark
  },
  footerTextBottomBlue: {
    fontFamily: "Airbnb-Book",
    color: colors.blue
  }
});

LoginScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default LoginScreen;
