//import liraries
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";
import Toast from "react-native-easy-toast";
// REDUX
import { useSelector } from "react-redux";
// CUSTOM SEZIN COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleIzin from "../components/General/SezinSingleIzin";
import SezinDescription from "../components/Typography/SezinDescription";
import { colors } from "../assets/styles/colors";

import { izinlerData } from "../assets/data/izinler.data";
import GetInfoBeforeActionModal from "../components/Modal/GetInfoBeforeActionModal";

// SERVICES
import { getOwnIzinRequests } from "../services/izin-service";

// create a component
const MyIzinRequestsScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [endData, setEndData] = useState(false);
  const [izinRequests, setIzinRequests] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelRequestLoading, setCancelRequestLoading] = useState(false);

  useEffect(() => {
    // setLoadingState(true);
    // setTimeout(() => {
    //   setIzinRequests(izinlerData.slice(0, 3));
    //   setLoadingState(false);
    // }, 1000);
    setLoadingState(true);
    getOwnIzinRequests(currentPage, 5, accessToken).then(res => {
      if (res.data.result.length > 0) {
        setIzinRequests(res.data.result);
        setCurrentPage(prev => prev + 1);
      } else {
        setEndData(true);
      }
      setLoadingState(false);
    });
  }, []);

  const _loadData = () => {
    // setLoadingState(true);
    // setTimeout(() => {
    //   setIzinRequests(prev => [...prev, ...izinlerData.slice(3, 6)]);
    //   setLoadingState(false);
    // }, 1500);
    // IF NOT STILL LOADING, LOAD NEW DATA
    if (!loadingState && !endData) {
      setLoadingState(true);
      getOwnIzinRequests(currentPage, 5, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setIzinRequests(prev => [...prev, ...res.data.result]);
            setCurrentPage(prev => prev + 1);
          } else {
            setEndData(true);
          }
          setLoadingState(false);
        })
        .catch(err => setLoadingState(false));
    }
  };

  const sendCancelRequest = () => {
    setCancelRequestLoading(true);
    setTimeout(() => {
      setCancelRequestLoading(false);
      setIsCancelModalOpen(false);
      toast.current.show("İzin talebi iptali başarılı", 1000);
    }, 1500);
  };

  return (
    <>
      <FlatList
        data={izinRequests}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <SezinSingleIzin
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            onCancelRequest={setIsCancelModalOpen.bind(this, true)}
            {...item}
          />
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={_loadData.bind(this)}
        ListHeaderComponent={() => (
          <View>
            {/* HEADER PART */}
            <SezinHeader
              onPressLeft={() => props.navigation.goBack()}
              leftIconName="chevron-left"
            />
            <SezinTitle text="İzin Taleplerim" />
            <SezinDescription
              text="Buradan talep etmiş olduğunuz tüm izinlere erişebilirsiniz."
              textStyle={{ paddingBottom: 20 }}
            />
          </View>
        )}
        ListFooterComponent={() => {
          if (loadingState) {
            return (
              <View style={styles.footerSpinnerContainer}>
                <MaterialIndicator color={colors.blue} size={50} />
              </View>
            );
          } else if (endData) {
            return (
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Gösterilecek İş Emri Kalmadı.
                </Text>
              </View>
            );
          } else {
            return null;
          }
        }}
      />
      <GetInfoBeforeActionModal
        isModalOpen={isCancelModalOpen}
        onBackdropPress={() => setIsCancelModalOpen(false)}
        onChangeModalText={text => console.log(text)}
        onCloseButtonPressed={() => setIsCancelModalOpen(false)}
        onApproveButtonPressed={() => sendCancelRequest()}
        loadingApproveButton={cancelRequestLoading}
        approveButtonColor={colors.red}
        approveButtonHighlightColor={colors.darkRed}
        descriptionText="İzin talebinizi iptal etmek istediğinize emin misiniz?"
        inputLabel="İptal Gerekçesi"
        headerText="İzin Talebi İptali"
        approveButtonText="İptal Et"
      />
      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={{
          ...styles.toastContainerStyle,
          // backgroundColor: props.navigation.getParam("toastColor", null)
          backgroundColor: colors.green
        }}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 4,
    width: (Dimensions.get("window").width * 9) / 10,
    overflow: "hidden"
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
  },
  footerTextContainer: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  footerText: {
    fontFamily: "Airbnb-Book",
    fontSize: 15,
    color: colors.gray
  },
  footerSpinnerContainer: {
    height: 100,
    width: 100,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

MyIzinRequestsScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default MyIzinRequestsScreen;
