//import liraries
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Toast from "react-native-easy-toast";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinDatePicker from "../components/Inputs/SezinDatePicker";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinInput from "../components/Inputs/SezinInput";
import SezinDescription from "../components/Typography/SezinDescription";

import { izinTypes } from "../assets/data/izin-types.data";
import { colors } from "../assets/styles/colors";
// REDUX
import { useSelector } from "react-redux";

import { createNewIzinRequest } from "../services/izin-service";

// create a component
const NewIzinScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const toast = useRef(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formState, setFormState] = useState({
    startDate: null,
    finishDate: null,
    leaveType: null,
    description: null
  });

  const handleSubmit = () => {
    const { startDate, finishDate, leaveType, description } = formState;
    if (startDate && finishDate && leaveType && description) {
      setFormLoading(true);
      return createNewIzinRequest(
        accessToken,
        startDate,
        finishDate,
        leaveType,
        description
      )
        .then(res => {
          setFormLoading(false);
          if (res.data.hasError) {
            toast.current.show(res.data.message, 1000);
          } else {
            props.navigation.navigate("IzinMain", {
              toastColor: colors.green,
              toastText: "İzin Talebiniz Başarı ile Gönderilmiştir."
            });
          }
        })
        .catch(err => {
          setFormLoading(false);
          toast.current.show(
            "İzin talebi iletiminde hata meydana geldi.",
            1000
          );
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss.bind(this)}>
      <ScrollView contentContainerStyle={styles.container}>
        <SezinHeader
          leftIconName="chevron-left"
          onPressLeft={() => props.navigation.goBack()}
        />
        <SezinTitle text="Yeni İzin Talebi" />
        <SezinDescription text="Bu bölümden yeni izin taleplerinde bulunabilirsiniz." />
        <SezinDatePicker
          onDateChange={startDate =>
            setFormState(prev => ({ ...prev, startDate }))
          }
          placeholderText="İzin Başlangıcı"
        />
        <SezinDatePicker
          onDateChange={finishDate =>
            setFormState(prev => ({ ...prev, finishDate }))
          }
          placeholderText="İzin Bitiş Tarihi"
        />
        <SezinPicker
          items={izinTypes}
          placeholderText="İzin Tipi"
          contentContainerStyle={{ marginTop: 30, marginBottom: 10 }}
          onValueChange={leaveType =>
            setFormState(prev => ({ ...prev, leaveType }))
          }
        />
        <SezinInput
          onChangeText={description =>
            setFormState(prev => ({ ...prev, description }))
          }
          multiline={true}
          label="Açıklama"
        />
        <SezinLoadingButton
          onPress={handleSubmit}
          loading={formLoading}
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
            backgroundColor: colors.red
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
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

NewIzinScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewIzinScreen;
