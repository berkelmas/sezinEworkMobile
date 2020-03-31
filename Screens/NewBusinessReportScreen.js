//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { colors } from "../assets/styles/colors";
import Toast from "react-native-easy-toast";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinInput from "../components/Inputs/SezinInput";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinMultipleSelect from "../components/Inputs/SezinMultipleSelect";
import SezinDatePicker from "../components/Inputs/SezinDatePicker";
import SezinDescription from "../components/Typography/SezinDescription";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGroupsAction,
  getAllUsersAction
} from "../store/actions/ResourcesActions";

// WEB SERVICES
import { createNewBusinessReport } from "../services/business-report-service";

// create a component
const NewBusinessReportScreen = props => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  const [loadingState, setLoadingState] = React.useState(false);
  const [usersPairs, setUsersPairs] = useState(null);
  const [groupsPairs, setGroupsPairs] = useState(null);

  // resources for the form
  const users = useSelector(state => state.ResourcesReducer.users);
  const groups = useSelector(state => state.ResourcesReducer.groups);

  // DATA LOADING FOR INPUTS
  const [groupsLoadingState, setGroupsLoadingState] = useState(true);
  const [usersLoadingState, setUsersLoadingState] = useState(true);

  // SELECTED VALUES
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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

  const handleSubmit = () => {
    if (
      selectedTitle &&
      selectedDescription &&
      selectedGroups &&
      selectedUsers &&
      selectedEndDate
    ) {
      setLoadingState(true);
      createNewBusinessReport(
        accessToken,
        selectedTitle,
        selectedDescription,
        selectedUsers.map(item => item.id),
        selectedGroups.map(item => item.id),
        selectedEndDate
      )
        .then(res => {
          setLoadingState(false);
          if (!res.hasError) {
            props.navigation.navigate("Home", {
              toastColor: colors.green,
              toastText: "Saha Takip Raporu Başarı İle Kaydedildi."
            });
          } else {
            toast.current.show(res.message, 1000);
          }
        })
        .catch(err => {
          setLoadingState(false);
          toast.current.show(
            "Saha takip raporu kaydında hata meydana geldi.",
            1000
          );
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <SezinHeader
          leftIconName="chevron-left"
          onPressLeft={() => props.navigation.goBack()}
        />
        <SezinTitle text="Saha Takip Raporu" />
        <SezinDescription text="Buradan bölgenizle ilgili saha takip raporları oluşturabilirsiniz." />
        <SezinInput
          label="Başlık"
          containerStyle={{ marginTop: 20 }}
          onChangeText={setSelectedTitle.bind(this)}
        />
        <SezinInput
          label="Açıklama"
          multiline={true}
          containerStyle={{ marginTop: 20 }}
          onChangeText={setSelectedDescription.bind(this)}
        />

        <SezinMultipleSelect
          loadingData={usersLoadingState}
          placeholderText="Kullanıcılar"
          contentContainerStyle={{ marginTop: 30 }}
          items={usersPairs}
          onSelectionChange={val =>
            setSelectedUsers(val.map(item => ({ id: item.value })))
          }
        />

        <SezinMultipleSelect
          loadingData={groupsLoadingState}
          placeholderText="Personel Grubu"
          contentContainerStyle={{ marginTop: 30 }}
          items={groupsPairs}
          onSelectionChange={val =>
            setSelectedGroups(val.map(item => ({ id: item.value })))
          }
        />

        <SezinDatePicker
          contentContainerStyle={{ marginTop: 30 }}
          placeholderText="Bitiş Tarihi"
          onDateChange={setSelectedEndDate.bind(this)}
        />

        <SezinLoadingButton
          onPress={handleSubmit.bind(this)}
          loading={loadingState}
          color={colors.green}
          overlayColor={colors.darkGreen}
          text="Kaydet"
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

NewBusinessReportScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

//make this component available to the app
export default NewBusinessReportScreen;
