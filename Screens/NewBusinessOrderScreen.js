//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { colors } from "../assets/styles/colors";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinInput from "../components/Inputs/SezinInput";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinDatePicker from "../components/Inputs/SezinDatePicker";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinMultipleSelect from "../components/Inputs/SezinMultipleSelect";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGroupsAction,
  getAllUsersAction
} from "../store/actions/ResourcesActions";

// create a component
const NewBusinessOrderScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [loadingState, setLoadingState] = useState(false);
  // DATA LOADING FOR INPUTS
  const [groupsLoadingState, setGroupsLoadingState] = useState(true);
  const [usersLoadingState, setUsersLoadingState] = useState(true);

  const [documentNumber, setDocumentNumber] = useState(null);
  const dispatch = useDispatch();

  // resources for the form
  const users = useSelector(state => state.ResourcesReducer.users);
  const groups = useSelector(state => state.ResourcesReducer.groups);

  const [usersPairs, setUsersPairs] = useState(null);
  const [groupsPairs, setGroupsPairs] = useState(null);

  useEffect(() => {
    if (users.length < 1) {
      dispatch(getAllUsersAction(accessToken));
    }
    if (groups.length < 1) {
      dispatch(getAllGroupsAction(accessToken));
    }
  }, []);

  useEffect(() => {
    if (users.length) {
      setUsersPairs(
        users.map(user => ({ label: user.showName, value: user.id }))
      );
      setUsersLoadingState(false);
    }
  }, [users]);

  useEffect(() => {
    if (groups.length) {
      setGroupsPairs(
        groups.map(group => ({
          label: group.name,
          value: group.id
        }))
      );
      setGroupsLoadingState(false);
    }
  }, [groups]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.container}>
          <SezinHeader
            onPressLeft={() => props.navigation.goBack()}
            leftIconName="chevron-left"
          />
          <SezinTitle text="Yeni İş Emri" />

          <SezinInput label="Başlık" containerStyle={{ marginTop: 10 }} />
          <SezinInput
            label="Açıklama"
            containerStyle={{ marginTop: 10 }}
            multiline={true}
          />
          <SezinMultipleSelect
            loadingData={usersLoadingState}
            placeholderText="Görev Verilen Kişi"
            contentContainerStyle={{ marginTop: 30 }}
            items={usersPairs}
            onSelectionChange={val => console.log(val)}
          />

          <SezinMultipleSelect
            loadingData={groupsLoadingState}
            placeholderText="Personel Grubu"
            contentContainerStyle={{ marginTop: 30 }}
            items={groupsPairs}
            onSelectionChange={val => console.log(val)}
          />

          <SezinPicker
            placeholderText="Öncelik Durumu"
            contentContainerStyle={{ marginTop: 30 }}
            items={[
              { label: "Kritik", value: "football" },
              { label: "Normal", value: "baseball" },
              { label: "Acil Degil", value: "hockey" }
            ]}
          />

          <SezinDatePicker placeholderText="Bitiş Tarihi" />
          <SezinLoadingButton
            color={colors.blue}
            overlayColor={colors.darkBlue}
            text="Kaydet"
            containerStyle={{ marginTop: 35 }}
            onPress={() => {
              setLoadingState(true);
              setTimeout(() => {
                setLoadingState(false);
                props.navigation.navigate("Home", {
                  toastColor: colors.green,
                  toastText: "İş Emri Başarı İle Kaydedildi."
                });
              }, 1500);
            }}
            loading={loadingState}
          />
          {/* BOTTOM MARGIN */}
          <View style={{ height: 50, width: 50 }} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
});

NewBusinessOrderScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewBusinessOrderScreen;
