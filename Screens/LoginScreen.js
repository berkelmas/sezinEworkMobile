import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { colors } from "../assets/styles/colors";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";

const LoginScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* TOP LOGO AND TEXT */}
        <View style={{ height: 100 }} />
        <View>
          <Image
            source={require("../assets/images/sezin-logo.png")}
            style={{ height: 90, width: 90, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.headerTextBig}>Merhaba</Text>
        <Text style={styles.headerTextSmall}>E-Work'e Giriş Yapın</Text>

        {/* FORM CONTAINER */}
        <View style={{ paddingTop: 40 }}>
          {/* EMAIL */}
          <View>
            <Item floatingLabel>
              <Label style={styles.labelStyle}>Email</Label>
              <Input autoCapitalize="none" style={styles.inputStyle} />
            </Item>
          </View>

          {/* PASSWORD */}
          <View style={{ marginTop: 10 }}>
            <Item floatingLabel>
              <Label style={styles.labelStyle}>Şifre</Label>
              <Input secureTextEntry={true} style={styles.inputStyle} />
            </Item>
          </View>
        </View>

        {/* INLINE BLOCK WORK-AROUND FOR RN */}
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => console.log("berklmas")}
              underlayColor={colors.darkBlue}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableHighlight>
          </View>

          {/* BOTTOM TEXT */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.footerTextTop}>Sorun mu yaşıyorsunuz?</Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/digrise-logo.png")}
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
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
    borderRadius: 8
  },
  buttonContainer: {
    shadowColor: colors.blue,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  },
  buttonText: {
    color: "white",
    fontFamily: "Airbnb-Book",
    fontSize: 25
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

export default LoginScreen;
