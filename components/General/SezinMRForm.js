//import liraries
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { useSelector } from "react-redux";

// SEZIN CUSTOM INPUTS
import SezinInput from "../Inputs/SezinInput";
import SezinPicker from "../Inputs/SezinPicker";
import SezinLoadingButton from "../Buttons/SezinLoadingButton";
import { colors } from "../../assets/styles/colors";
import {
  airConditionData,
  chillerData,
  cleanData,
  upsType
} from "../../assets/data/technical-room-data";
import { sendMrForm } from "../../services/technical-room-service";

// create a component
const SezinMRForm = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [loadingState, setLoadingState] = React.useState(false);
  const [formValues, setFormValues] = useState({
    heliumLevel: null,
    pressureLevel: null,
    waterDegree: null,
    roomHumidity: null,
    airConditionState: null,
    upsState: null,
    chillerState: null,
    roomClean: null
  });

  const submitForm = () => {
    const {
      heliumLevel,
      pressureLevel,
      waterDegree,
      roomHumidity,
      airConditionState,
      upsState,
      chillerState,
      roomClean
    } = formValues;

    if (
      heliumLevel &&
      pressureLevel &&
      waterDegree &&
      roomHumidity &&
      airConditionData &&
      upsState &&
      chillerState &&
      roomClean
    ) {
      setLoadingState(true);
      sendMrForm(
        heliumLevel,
        pressureLevel,
        waterDegree,
        roomHumidity,
        airConditionState,
        upsState,
        chillerState,
        roomClean,
        "",
        accessToken
      )
        .then(res => {
          if (!res.data.hasError) {
            props.navigation.navigate("Home", {
              toastColor: colors.green,
              toastText: "MR Teknik Oda Başarı İle Kaydedildi."
            });
          } else {
            props.handleToast(res.data.message, colors.red);
          }
          setLoadingState(false);
        })
        .catch(err => {
          setLoadingState(false);
          props.handleToast("Beklenmedik Hata Meydana Geldi.", colors.red);
        });
    } else {
      props.handleToast("Tüm alanları doldurmanız gerekmektedir.", colors.red);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <SezinInput
          inputProps={{ keyboardType: "numeric" }}
          label="Helyum Seviyesi"
          containerStyle={{ marginTop: 20, width: "45%", marginRight: "10%" }}
          onChangeText={heliumLevel =>
            setFormValues(prev => ({ ...prev, heliumLevel }))
          }
        />
        <SezinInput
          inputProps={{ keyboardType: "numeric" }}
          label="Basınç Seviyesi"
          containerStyle={{ marginTop: 20, width: "45%" }}
          onChangeText={pressureLevel =>
            setFormValues(prev => ({ ...prev, pressureLevel }))
          }
        />
        <SezinInput
          inputProps={{ keyboardType: "numeric" }}
          label="Su Sıcaklığı"
          containerStyle={{ marginTop: 20, width: "45%", marginRight: "10%" }}
          onChangeText={waterDegree =>
            setFormValues(prev => ({ ...prev, waterDegree }))
          }
        />
        <SezinInput
          inputProps={{ keyboardType: "numeric" }}
          label="Oda Nem Seviyesi"
          containerStyle={{ marginTop: 20, width: "45%" }}
          onChangeText={roomHumidity =>
            setFormValues(prev => ({ ...prev, roomHumidity }))
          }
        />

        <SezinPicker
          contentContainerStyle={{ width: "45%", marginRight: "10%" }}
          placeholderText="Klima Durumu"
          items={airConditionData}
          onValueChange={airConditionState =>
            setFormValues(prev => ({ ...prev, airConditionState }))
          }
        />

        <SezinPicker
          contentContainerStyle={{ width: "45%" }}
          placeholderText="UPS Durumu"
          items={upsType}
          onValueChange={upsState =>
            setFormValues(prev => ({ ...prev, upsState }))
          }
        />
        <SezinPicker
          contentContainerStyle={{ width: "45%", marginRight: "10%" }}
          placeholderText="Chiller Durumu"
          items={chillerData}
          onValueChange={chillerState =>
            setFormValues(prev => ({ ...prev, chillerState }))
          }
        />
        <SezinPicker
          contentContainerStyle={{ width: "45%" }}
          placeholderText="Oda Temizliği"
          items={cleanData}
          onValueChange={roomClean =>
            setFormValues(prev => ({ ...prev, roomClean }))
          }
        />
      </View>
      <SezinLoadingButton
        onPress={submitForm.bind(this)}
        color={colors.green}
        overlayColor={colors.darkGreen}
        loading={loadingState}
        text="Kaydet"
        containerStyle={{ marginTop: 30 }}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({});

SezinMRForm.propTypes = {
  handleToast: PropTypes.func
};

//make this component available to the app
export default withNavigation(SezinMRForm);
