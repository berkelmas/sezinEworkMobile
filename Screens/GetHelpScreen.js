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
import SezinDescription from "../components/Typography/SezinDescription";

const GetHelpScreen = props => {
  const [loadingState, setLoadingState] = React.useState(false);
  const toast = useRef(null);
  const [userFullName, setUserFullName] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const fullName = useSelector(state => state.AuthReducer.fullName);
  const token = useSelector(state => state.AuthReducer.accessToken);

  const handleSubmit = () => {
    if (title && description && title !== "" && description !== "") {
      if (fullName) {
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
      } else {
        // IF NOT LOGGED IN
        setLoadingState(true);
        createHelpRequestNotLoggedIn(userFullName, title, description)
          .then(res => {
            setLoadingState(false);
            if (res.data.hasError) {
              toast.current.show(res.data.message, 1000);
            } else {
              props.navigation.navigate("Login", {
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
        <SezinDescription
          containerStyle={{ marginTop: 7 }}
          text={
            <Text>
              Buradan uygulama kullanımında yaşadığınız sorunlar hakkında{" "}
              <Text style={{ color: colors.green }}>destek</Text> alabilirsiniz.
            </Text>
          }
        />

        {/* FORM CONTAINER */}
        <View style={styles.formContainer}>
          <SezinInput
            label="Ad-Soyad"
            inputProps={{ value: fullName, disabled: fullName && true }}
            onChangeText={setUserFullName.bind(this)}
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
          containerStyle={{ marginTop: 15 }}
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
    paddingHorizontal: 20
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  },
  formContainer: {
    marginTop: 12
  }
});

GetHelpScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

export default GetHelpScreen;
