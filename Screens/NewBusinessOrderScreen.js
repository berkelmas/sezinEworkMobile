//import liraries
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import Toast from "react-native-easy-toast";
import { colors } from "../assets/styles/colors";

// CUSTOM SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinInput from "../components/Inputs/SezinInput";
import SezinPicker from "../components/Inputs/SezinPicker";
import SezinDatePicker from "../components/Inputs/SezinDatePicker";
import SezinLoadingButton from "../components/Buttons/SezinLoadingButton";
import SezinMultipleSelect from "../components/Inputs/SezinMultipleSelect";
import SezinDescription from "../components/Typography/SezinDescription";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGroupsAction,
  getAllUsersAction
} from "../store/actions/ResourcesActions";
import {
  getNewBusinessOrderDocumentNumber,
  createNewBusinessOrder
} from "../services/business-order-service";

// create a component
const NewBusinessOrderScreen = props => {
  const toast = useRef(null);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [loadingState, setLoadingState] = useState(false);

  // DATA LOADING FOR INPUTS
  const [groupsLoadingState, setGroupsLoadingState] = useState(true);
  const [usersLoadingState, setUsersLoadingState] = useState(true);
  const dispatch = useDispatch();

  // resources for the form
  const users = useSelector(state => state.ResourcesReducer.users);
  const groups = useSelector(state => state.ResourcesReducer.groups);

  const [usersPairs, setUsersPairs] = useState(null);
  const [groupsPairs, setGroupsPairs] = useState(null);

  // SELECTED VALUES
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
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
      selectedDescription &&
      selectedTitle &&
      selectedPriority &&
      selectedGroups.length &&
      selectedUsers.length &&
      selectedEndDate
    ) {
      setLoadingState(true);
      getNewBusinessOrderDocumentNumber(accessToken).then(res => {
        const docNumber = res.data.result;
        createNewBusinessOrder(
          accessToken,
          selectedTitle,
          selectedDescription,
          selectedUsers,
          selectedGroups,
          selectedPriority,
          selectedEndDate,
          docNumber
        )
          .then(res => {
            setLoadingState(false);
            props.navigation.navigate("Home", {
              toastColor: colors.green,
              toastText: "İş Emri Başarı İle Kaydedildi."
            });
          })
          .catch(err => {
            setLoadingState(false);
            toast.current.show(
              "Yeni iş emri iletiminde sorun meydana geldi.",
              1000
            );
          });
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.container}>
          <SezinHeader
            onPressLeft={() => props.navigation.goBack()}
            leftIconName="chevron-left"
          />
          <SezinTitle text="Yeni İş Emri" />
          <SezinDescription text="Aşağıdaki formu doldurarak yeni iş emirlerinizi düzenleyebilirsiniz." />

          <SezinInput
            label="Başlık"
            containerStyle={{ marginTop: 20 }}
            onChangeText={setSelectedTitle.bind(this)}
          />
          <SezinInput
            onChangeText={setSelectedDescription.bind(this)}
            label="Açıklama"
            containerStyle={{ marginTop: 10 }}
            multiline={true}
          />
          <SezinMultipleSelect
            loadingData={usersLoadingState}
            placeholderText="Görev Verilen Kişi"
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

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            <SezinPicker
              placeholderText="Öncelik Durumu"
              contentContainerStyle={{ width: "45%", marginTop: 30 }}
              items={[
                { label: "Önemli", value: 2 },
                { label: "Normal", value: 1 },
                { label: "Düşük", value: 0 }
              ]}
              onValueChange={setSelectedPriority.bind(this)}
            />

            <SezinDatePicker
              contentContainerStyle={{ width: "45%", marginTop: 30 }}
              placeholderText="Bitiş Tarihi"
              onDateChange={setSelectedEndDate.bind(this)}
            />
          </View>

          <SezinLoadingButton
            color={colors.blue}
            overlayColor={colors.darkBlue}
            text="Kaydet"
            containerStyle={{ marginTop: 35 }}
            onPress={handleSubmit.bind(this)}
            loading={loadingState}
          />
          {/* BOTTOM MARGIN */}
          <View style={{ height: 50, width: 50 }} />
        </View>
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
    paddingHorizontal: 20
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

NewBusinessOrderScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default NewBusinessOrderScreen;
