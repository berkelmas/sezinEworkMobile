//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Toast from "react-native-easy-toast";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDescription from "../components/Typography/SezinDescription";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import { colors } from "../assets/styles/colors";
import { changePasswordService } from "../services/auth-service";
// REDUX
import { useSelector } from "react-redux";

// create a component
const ChangePasswordScreen = props => {
  const toast = React.useRef(null);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  const [loadingState, setLoadingState] = useState(false);
  const [formState, setFormState] = useState({
    passwordOne: "",
    passwordTwo: ""
  });

  const handleUpdatePasswordSubmit = () => {
    if (
      formState.passwordOne === formState.passwordTwo &&
      formState.passwordOne !== ""
    ) {
      setLoadingState(true);
      changePasswordService(formState.passwordOne, accessToken)
        .then(res => {
          setLoadingState(false);
          if (!res.data.hasError) {
            props.navigation.navigate("ProfilePage", {
              toastColor: colors.green,
              toastText: "Şifreniz Başarı İle Değiştirildi."
            });
          } else {
            toast.current.show(res.message, 1000);
          }
        })
        .catch(err => {
          setLoadingState(false);
          toast.current.show("Beklenmedik Bir Hata Meydana Geldi.", 1000);
        });
    } else {
      toast.current.show("Girdiğiniz Şifreler Uyuşmamaktadır.", 1000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* HEADER PART */}
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
          containerStyle={{ paddingTop: 20 }}
        />
        <SezinTitle text="Şifre Değiştir" />
        <SezinDescription text="Buradan Sezin E-Work’e giriş için kullandığınız şifrenizi değiştirebilirsiniz." />

        <SezinInput
          secureEntry={true}
          onChangeText={passwordOne =>
            setFormState({ ...formState, passwordOne })
          }
          label="Yeni Şifre"
          containerStyle={{ paddingTop: 10 }}
        />
        <SezinInput
          secureEntry={true}
          onChangeText={passwordTwo =>
            setFormState({ ...formState, passwordTwo })
          }
          label="Yeni Şifre Tekrar"
          containerStyle={{ paddingTop: 10 }}
        />
        <SezinLoadingButton
          color={colors.blue}
          overlayColor={colors.darkBlue}
          text="Şifre Değiştir"
          loading={loadingState}
          onPress={handleUpdatePasswordSubmit.bind(this)}
          containerStyle={{ marginTop: 40 }}
        />

        <Toast
          position="top"
          positionValue={50}
          opacity={0.8}
          textStyle={styles.toastText}
          ref={toast}
          style={styles.toastContainerStyle}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  toastText: {
    fontFamily: "Airbnb-Book",
    color: "white",
    fontSize: 16 / PixelRatio.getFontScale()
  },
  toastContainerStyle: {
    backgroundColor: colors.red,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

ChangePasswordScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default ChangePasswordScreen;
