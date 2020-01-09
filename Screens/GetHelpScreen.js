import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Toast from "react-native-easy-toast";
import {
  createHelpRequestLoggedIn,
  createHelpRequestNotLoggedIn
} from "../services/get-help-service";

// SEZIN CUSTOM COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import { colors } from "../assets/styles/colors";

// REDUX
import { useSelector } from "react-redux";

const GetHelpScreen = props => {
  const [loadingState, setLoadingState] = React.useState(false);
  const toast = useRef(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const fullName = useSelector(state => state.AuthReducer.fullName);
  const token = useSelector(state => state.AuthReducer.accessToken);

  const handleSubmit = () => {
    if (fullName) {
      if (title && description && title !== "" && description !== "") {
        setLoadingState(true);
        createHelpRequestLoggedIn(fullName, title, description, token)
          .then(res => {
            setLoadingState(false);
            if (res.data.hasError) {
              toast.current.show(res.data.message, 1000);
            } else {
              props.navigation.navigate("Home", {
                toastColor: colors.green,
                toastText: "Destek Talebiniz ile Gönderilmiştir."
              });
            }
          })
          .catch(err => {
            setLoadingState(false);
            toast.current.show(
              "Destek talebi iletiminde hata meydana geldi.",
              1000
            );
          });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          onPressLeft={() => props.navigation.goBack()}
          leftIconName="chevron-left"
        />
        <SezinTitle text="Destek Al" />

        {/* FORM CONTAINER */}
        <View style={styles.formContainer}>
          <SezinInput
            label="Ad-Soyad"
            inputProps={{ value: fullName, disabled: fullName && true }}
            onChangeText={val => console.log(val)}
          />
          <SezinInput
            label="Başlık"
            onChangeText={setTitle.bind(this)}
            containerStyle={{ marginTop: 10 }}
          />
          <SezinInput
            label="Açıklama"
            onChangeText={setDescription.bind(this)}
            containerStyle={{ marginTop: 10 }}
            multiline={true}
          />
        </View>
        <SezinLoadingButton
          onPress={handleSubmit.bind(this)}
          loading={loadingState}
          color={colors.green}
          overlayColor={colors.darkGreen}
          text="Gönder"
          containerStyle={{ marginTop: 40 }}
        />
        <Toast
          position="top"
          positionValue={50}
          opacity={0.8}
          textStyle={styles.toastText}
          ref={toast}
          style={{
            ...styles.toastContainerStyle,
            backgroundColor: "red"
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
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  },
  formContainer: {
    marginVertical: 20
  }
});

GetHelpScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default GetHelpScreen;
