//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Toast from "react-native-easy-toast";
import { useSelector } from "react-redux";

// CUSTOM SEZIN COMPONENTS
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";

//DATA
import { colors } from "../assets/styles/colors";
import SezinTimePicker from "../components/Inputs/SezinTimePicker";

// SERVICES
import { addDailyReport } from "../services/daily-report-service";

// create a component
const DailyReportScreen = props => {
  const token = useSelector(state => state.AuthReducer.accessToken);
  const menuItems = useSelector(state => state.AuthReducer.menuItems);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [formValues, setFormValues] = useState({
    cekimCount: null,
    startDate: null,
    endDate: null,
    description: null
  });
  const [loadingState, setLoadingState] = useState(false);
  const toast = useRef(null);
  useEffect(() => {
    const allDevices = [
      {
        label: "KMD",
        value: "kmd",
        backendName: "AnalysisKMD"
      },
      {
        label: "MAMO",
        value: "mamo",
        backendName: "AnalysisMAMO"
      },
      {
        label: "USG",
        value: "usg",
        backendName: "AnalysisUSG"
      },
      {
        label: "Rapor",
        value: "rapor",
        backendName: "AnalysisRAPOR"
      },
      {
        label: "CR",
        value: "cr",
        backendName: "AnalysisCR"
      }
    ];
    const validDevices = allDevices.filter(singleDevice => {
      let valid = false;
      menuItems.map(name => {
        if (name["mobilePath"] === singleDevice.backendName) {
          return (valid = true);
        }
      });
      return valid;
    });
    setDevices([...validDevices]);
  }, [menuItems]);

  useEffect(() => {
    setSelectedDevice(devices[0] ? devices[0].value : devices[0]);
  }, [devices]);

  const handleSubmit = () => {
    if (
      formValues.cekimCount &&
      formValues.endDate &&
      formValues.description &&
      formValues.startDate &&
      formValues.cekimCount !== "" &&
      formValues.endDate !== "" &&
      formValues.description !== "" &&
      formValues.startDate !== ""
    ) {
      setLoadingState(true);
      let type = null;
      switch (selectedDevice) {
        case "cr":
          type = 2;
          break;
        case "kmd":
          type = 3;
          break;
        case "mamo":
          type = 4;
          break;
        case "usg":
          type = 5;
          break;
        case "rapor":
          type = 6;
          break;
        default:
          break;
      }

      addDailyReport(
        formValues.cekimCount,
        formValues.startDate,
        formValues.endDate,
        type,
        token
      )
        .then(res => {
          setLoadingState(false);
          if (res.data.hasError) {
            toast.current.show(res.data.message, 1000);
          } else {
            props.navigation.navigate("Home", {
              toastColor: colors.green,
              toastText: "Günlük Raporunuz Başarı ile Gönderilmiştir."
            });
          }
        })
        .catch(err => {
          setLoadingState(false);
          toast.current.show(
            "Günlük rapor iletiminde hata meydana geldi.",
            1000
          );
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          leftIconName="chevron-left"
          onPressLeft={() => props.navigation.goBack()}
        />
        <SezinTitle text="Günlük Raporlama" />
        <SezinPicker
          onValueChange={device => setSelectedDevice(device)}
          placeholderText="Cihaz"
          items={devices}
          initialSelection={devices[0]}
        />
        <SezinInput
          label="Günlük Çekim Sayısı"
          inputProps={{ keyboardType: "numeric" }}
          containerStyle={{ marginTop: 25 }}
          onChangeText={val =>
            setFormValues(prev => ({ ...prev, cekimCount: val }))
          }
        />

        <SezinTimePicker
          placeholderText="Başlangıç Saati"
          onValueChange={date =>
            setFormValues(prev => ({ ...prev, startDate: date }))
          }
        />

        <SezinTimePicker
          placeholderText="Bitiş Saati"
          onValueChange={date =>
            setFormValues(prev => ({ ...prev, endDate: date }))
          }
        />

        <SezinInput
          label="Açıklama"
          multiline={true}
          containerStyle={{ marginTop: 25 }}
          onChangeText={text =>
            setFormValues(prev => ({ ...prev, description: text }))
          }
        />

        <SezinLoadingButton
          loading={loadingState}
          onPress={handleSubmit.bind(this)}
          color={colors.blue}
          overlayColor={colors.darkBlue}
          text="Gönder"
          containerStyle={{ marginTop: 50 }}
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
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

DailyReportScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default DailyReportScreen;
