//import liraries
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import Toast from "react-native-easy-toast";
import { useSelector } from "react-redux";

// CUSTOM SEZIN COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleIzinOptions from "../components/General/SezinSingleIzinOptions";
import SezinDescription from "../components/Typography/SezinDescription";
import GetInfoBeforeActionModal from "../components/Modal/GetInfoBeforeActionModal";
import AskAgainBeforeActionModal from "../components/Modal/AskAgainBeforeActionModal";
import { colors } from "../assets/styles/colors";

import { izinlerOnayData } from "../assets/data/izinler.data";
import {
  getWaitingCancelApproveOrRejectIzin,
  rejectCancelIzin,
  approveCancelIzin
} from "../services/izin-service";

// create a component
const IzinCancelApproveScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const toast = useRef(null);
  const [toastColor, setToastColor] = useState(colors.green);

  const [izinCancelRequests, setIzinCancelRequests] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [endState, setEndState] = useState(false);

  // DENY HANDLING
  const [denyRequestLoading, setDenyRequestLoading] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedIzinForDeny, setSelectedIzinForDeny] = useState(null);
  // APPROVE HANDLING
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedIzinForApprove, setSelectedIzinForApprove] = useState(null);
  const [approveRequestLoading, setApproveRequestLoading] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    getWaitingCancelApproveOrRejectIzin(currentPage, 5, accessToken)
      .then(res => {
        if (res.data.result.length > 0) {
          setIzinCancelRequests(res.data.result);
          setCurrentPage(prev => prev + 1);
          setLoadingState(false);
        } else {
          setEndState(true);
        }
      })
      .catch(err => setLoadingState(false));
  }, []);

  const _loadData = () => {
    if (!loadingState && !endState) {
      setLoadingState(true);
      getWaitingCancelApproveOrRejectIzin(currentPage, 5, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setIzinCancelRequests(prev => [...prev, ...res.data.result]);
            setLoadingState(false);
            setCurrentPage(prev => prev + 1);
          } else {
            setEndState(true);
            setLoadingState(false);
          }
        })
        .catch(err => setLoadingState(false));
    }
  };

  // DENY HANDLING
  const sendDenyRequest = () => {
    setDenyRequestLoading(true);
    rejectCancelIzin(selectedIzinForDeny.id, accessToken)
      .then(res => {
        if (!res.data.hasError) {
          setToastColor(colors.green);
          toast.current.show("İzin iptal talebi reddi başarılı.", 1000);
          setIzinCancelRequests(prev =>
            prev.filter(item => item.id !== selectedIzinForDeny.id)
          );
        } else {
          setToastColor(colors.red);
          toast.current.show(res.data.message, 1000);
        }
        handleCloseModalForDeny();
        setDenyRequestLoading(false);
      })
      .catch(err => {
        setDenyRequestLoading(false);
        setToastColor(colors.red);
        handleCloseModalForDeny();
        toast.current.show("Beklenmedik bir sorun oluştu.", 1000);
      });
  };

  const handleSelectForDeny = item => {
    setIsDenyModalOpen(true);
    setSelectedIzinForDeny(item);
  };

  const handleCloseModalForDeny = () => {
    setIsDenyModalOpen(false);
    setSelectedIzinForDeny(null);
  };

  // APPROVE HANDLING
  const sendApproveRequest = () => {
    // setApproveRequestLoading(true);
    // setTimeout(() => {
    //   setApproveRequestLoading(false);
    //   setIsApproveModalOpen(false);
    //   toast.current.show("İzin talebi iptal onayı başarılı", 1000);
    // }, 1500);
    setApproveRequestLoading(true);
    approveCancelIzin(selectedIzinForApprove.id, accessToken)
      .then(res => {
        if (!res.data.hasError) {
          setToastColor(colors.green);
          toast.current.show("İzin iptal talebi onayı başarılı.", 1000);
          setIzinCancelRequests(prev =>
            prev.filter(item => item.id !== selectedIzinForApprove.id)
          );
        } else {
          setToastColor(colors.red);
          toast.current.show(res.data.message, 1000);
        }
        setApproveRequestLoading(false);
        handleCloseModalForApprove(false);
      })
      .catch(err => {
        setApproveRequestLoading(false);
        setToastColor(colors.red);
        handleCloseModalForApprove();
        toast.current.show("Beklenmedik bir sorun oluştu.", 1000);
      });
  };

  const handleSelectForApprove = item => {
    setIsApproveModalOpen(true);
    setSelectedIzinForApprove(item);
  };

  const handleCloseModalForApprove = () => {
    setIsApproveModalOpen(false);
    setSelectedIzinForApprove(null);
  };

  return (
    <>
      <FlatList
        data={izinCancelRequests}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <SezinSingleIzinOptions
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            onDenyRequest={handleSelectForDeny.bind(this, item)}
            onApproveRequest={handleSelectForApprove.bind(this, item)}
            approveLoading={false}
            denyLoading={false}
            approveButtonText="İptali Onayla"
            denyButtonText="İptali Reddet"
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
            <SezinTitle text="İptal Talebi Onayı" />
            <SezinDescription text="Buradan iptal talebinde bulunulmuş izin taleplerini yönetebilirsiniz." />
          </View>
        )}
        ListFooterComponent={() => {
          if (loadingState) {
            return (
              <View style={styles.footerSpinnerContainer}>
                <MaterialIndicator color={colors.blue} size={50} />
              </View>
            );
          } else if (endState) {
            return (
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Gösterilecek İzin Talebi Kalmadı.
                </Text>
              </View>
            );
          } else {
            return null;
          }
        }}
      />

      <AskAgainBeforeActionModal
        isModalOpen={isDenyModalOpen}
        onBackdropPress={handleCloseModalForDeny.bind(this)}
        onCloseButtonPressed={handleCloseModalForDeny.bind(this)}
        onApproveButtonPressed={sendDenyRequest.bind(this)}
        loadingApproveButton={denyRequestLoading}
        approveButtonColor={colors.red}
        approveButtonHighlightColor={colors.darkRed}
        descriptionText="Personelin izin talebi iptal isteğini reddetmek istediğinize emin misiniz?"
        headerText="İzin İptal Talebi Reddet"
        approveButtonText="İptali Reddet"
      />
      <AskAgainBeforeActionModal
        isModalOpen={isApproveModalOpen}
        onBackdropPress={handleCloseModalForApprove.bind(this)}
        onCloseButtonPressed={handleCloseModalForApprove.bind(this)}
        onApproveButtonPressed={sendApproveRequest.bind(this)}
        loadingApproveButton={approveRequestLoading}
        approveButtonColor={colors.green}
        approveButtonHighlightColor={colors.darkGreen}
        descriptionText="Personelin izin iptal talebini onaylamak istediğinize emin misiniz?"
        headerText="İzin İptal Talebi Onayla"
        approveButtonText="İptali Onayla"
      />
      <Toast
        position="top"
        positionValue={50}
        opacity={0.8}
        textStyle={styles.toastText}
        ref={toast}
        style={{
          ...styles.toastContainerStyle,
          backgroundColor: toastColor
        }}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
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

IzinCancelApproveScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default IzinCancelApproveScreen;
