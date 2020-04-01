//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../assets/styles/colors";
import { withNavigation } from "react-navigation";

// CUSTOM SEZIN INPUTS
import SezinInput from "../../components/Inputs/SezinInput";
import SezinPicker from "../../components/Inputs/SezinPicker";
import SezinLoadingButton from "../../components/Buttons/SezinLoadingButton";
import {
  airConditionData,
  cleanData,
  upsType
} from "../../assets/data/technical-room-data";
import { sendTomoForm } from "../../services/technical-room-service";
import { useSelector } from "react-redux";

// create a component
const SezinTomoForm = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [loadingState, setLoadingState] = React.useState(false);
  const [formValues, setFormValues] = useState({
    roomHumidity: null,
    airConditionState: null,
    upsState: null,
    roomClean: null
  });

  const submitForm = () => {
    const { roomHumidity, airConditionState, upsState, roomClean } = formValues;
    if (roomHumidity && airConditionState && upsState && roomClean) {
      setLoadingState(true);
      sendTomoForm(
        airConditionState,
        upsState,
        roomHumidity,
        roomClean,
        "",
        accessToken
      ).then(res => {
        if (!res.data.hasError) {
          props.navigation.navigate("Home", {
            toastColor: colors.green,
            toastText: "Tomografi Teknik Oda Başarı İle Kaydedildi."
          });
        } else {
          props.handleToast(res.data.message, colors.red);
        }
        setLoadingState(false);
      });
    } else {
      props.handleToast("Tüm Alanları Doldurmanız Gerekmektedir.", colors.red);
    }
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <View style={styles.container}>
      <SezinInput
        label="Oda Nem Seviyesi"
        containerStyle={{ marginTop: 20 }}
        onChangeText={roomHumidity =>
          setFormValues(prev => ({ ...prev, roomHumidity }))
        }
      />

      <SezinInput
        inputProps={{ keyboardType: "numeric" }}
        containerStyle={{ marginTop: 20 }}
        label="Klima Sıcaklığı"
        onChangeText={airConditionState =>
          setFormValues(prev => ({ ...prev, airConditionState }))
        }
      />

      {/* 
      <SezinPicker
        placeholderText="Klima Durumu"
        items={airConditionData}
        onValueChange={airConditionState =>
          setFormValues(prev => ({ ...prev, airConditionState }))
        }
      />
      */}
      <SezinPicker
        placeholderText="UPS Durumu"
        items={upsType}
        onValueChange={upsState =>
          setFormValues(prev => ({ ...prev, upsState }))
        }
      />
      <SezinPicker
        placeholderText="Oda Temizliği"
        items={cleanData}
        onValueChange={roomClean =>
          setFormValues(prev => ({ ...prev, roomClean }))
        }
      />
      <SezinLoadingButton
        onPress={submitForm.bind(this)}
        color={colors.green}
        overlayColor={colors.darkGreen}
        loading={loadingState}
        text="Kaydet"
        containerStyle={{ marginTop: 30 }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

SezinTomoForm.propTypes = {
  handleToast: PropTypes.func
};

//make this component available to the app
export default withNavigation(SezinTomoForm);
