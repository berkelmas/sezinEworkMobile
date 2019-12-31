//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { colors } from "../assets/styles/colors";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinInput from "../components/Inputs/SezinInput";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";

// create a component
const BusinessReportScreen = props => {
  const [loadingState, setLoadingState] = React.useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SezinHeader
          leftIconName="chevron-left"
          onPressLeft={() => props.navigation.goBack()}
        />
        <SezinTitle text="Saha Takip Raporu" />
        <SezinInput label="Başlık" containerStyle={{ marginTop: 20 }} />
        <SezinInput
          label="Açıklama"
          multiline={true}
          containerStyle={{ marginTop: 20 }}
        />
        <SezinPicker
          items={[
            { label: "Berk Elmas", value: "berkelmas" },
            { label: "Ali Yılmaz", value: "aliyilmaz" }
          ]}
          placeholderText="Kullanıcı"
        />
        <SezinPicker
          items={[
            { label: "GMK Hastanesi", value: "gmkhastanesi" },
            {
              label: "Sadi Konuk Devlet Hastanesi",
              value: "sadikonukdevlethastanesi"
            }
          ]}
          placeholderText="Grup"
        />
        <SezinLoadingButton
          onPress={() => {
            setLoadingState(true);
            setTimeout(() => {
              setLoadingState(false);
              props.navigation.navigate("Home", {
                toastText: "Saha Takip Raporunuz Başarı İle Gönderilmiştir."
              });
            }, 1000);
          }}
          loading={loadingState}
          color={colors.green}
          overlayColor={colors.darkGreen}
          text="Kaydet"
          containerStyle={{ marginTop: 40 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

BusinessReportScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

//make this component available to the app
export default BusinessReportScreen;
