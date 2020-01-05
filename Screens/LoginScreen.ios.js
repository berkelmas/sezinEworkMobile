import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Toast from "react-native-easy-toast";

// REDUX
import { connect, useSelector, useDispatch } from "react-redux";
import {
  loginStartAction,
  loginSuccessAction
} from "../store/actions/AuthActions";

// ASSETS
import { colors } from "../assets/styles/colors";
import SezinLogo from "../assets/images/sezin-logo.png";
import DigriseLogo from "../assets/images/digrise-logo.png";

// CUSTOM COMPONENTS
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinInput from "../components/Inputs/SezinInput";

const LoginScreen = props => {
  const loadingRedux = useSelector(state => state.AuthReducer.loading);
  const failedRedux = useSelector(state => state.AuthReducer.failedLogin);

  const [userState, setUserState] = React.useState({
    username: null,
    password: null
  });

  // REDUX DISPATCH FOR HOOKS
  const dispatch = useDispatch();

  const toast = React.useRef(null);
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

  React.useEffect(() => {
    if (failedRedux) {
      toast.current.show("Giriş işlemi başarısız.", 1000);
    }
  }, [failedRedux]);

  React.useEffect(() => {
    console.log("LOGIN RENDERED");
  }, []);

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
          <SezinInput
            onChangeText={username =>
              setUserState(prev => ({ ...prev, username }))
            }
            label="Email"
          />

          {/* PASSWORD */}
          <SezinInput
            onChangeText={password =>
              setUserState(prev => ({ ...prev, password }))
            }
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
          <SezinLoadingButton
            loading={loadingRedux}
            onPress={() => {
              dispatch(
                loginStartAction(userState.username, userState.password)
              );
            }}
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
        <Toast
          position="top"
          positionValue={50}
          opacity={0.8}
          textStyle={styles.toastText}
          ref={toast}
          style={{
            ...styles.toastContainerStyle,
            ...(failedRedux && { backgroundColor: colors.red })
          }}
        />
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
  },
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

LoginScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default connect()(LoginScreen);
