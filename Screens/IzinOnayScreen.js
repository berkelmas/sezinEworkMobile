//import liraries
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

// MATERIAL LOADING INDICATOR
import { MaterialIndicator } from "react-native-indicators";
import Toast from "react-native-easy-toast";

import { colors } from "../assets/styles/colors";

// CUSTOM SEZIN COMPONENTS
import SezinTitle from "../components/Typography/SezinTitle";
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleIzinOptions from "../components/General/SezinSingleIzinOptions";
import SezinDescription from "../components/Typography/SezinDescription";
import GetInfoBeforeActionModal from "../components/Modal/GetInfoBeforeActionModal";
import AskAgainBeforeActionModal from "../components/Modal/AskAgainBeforeActionModal";

import {
  getWaitingApproveOrDenyIzinPaging,
  approveIzin,
  rejectIzin
} from "../services/izin-service";
import { useSelector } from "react-redux";

// create a component
const IzinOnayScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const toast = useRef(null);
  const [toastColor, setToastColor] = useState(colors.green);

  const [izinRequests, setIzinRequests] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [endState, setEndState] = useState(false);

  // APPROVE IZIN REQUEST
  const [approveRequestLoading, setApproveRequestLoading] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedIzinForApprove, setSelectedIzinForApprove] = useState(null);

  // DENY IZIN REQUEST
  const [denyRequestLoading, setDenyRequestLoading] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedIzinForReject, setSelectedIzinForReject] = useState(null);
  const [descriptionForReject, setDescriptionForReject] = useState(null);

  useEffect(() => {
    setLoadingState(true);
    getWaitingApproveOrDenyIzinPaging(currentPage, 5, accessToken)
      .then(res => {
        if (res.data.result.length > 0) {
          setIzinRequests(res.data.result);
          setCurrentPage(prev => prev + 1);
        } else {
          setEndState(true);
        }
        setLoadingState(false);
      })
      .catch(err => setLoadingState(false));
  }, []);

  const _loadData = () => {
    if (!endState && !loadingState) {
      setLoadingState(true);
      getWaitingApproveOrDenyIzinPaging(currentPage, 5, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setIzinRequests(res.data.result);
            setCurrentPage(prev => prev + 1);
          } else {
            setEndState(true);
          }
          setLoadingState(false);
        })
        .catch(err => setLoadingState(false));
    }
  };

  // DENY HANDLING
  const sendDenyRequest = () => {
    if (descriptionForReject && descriptionForReject !== "") {
      setDenyRequestLoading(true);
      rejectIzin(selectedIzinForReject.id, descriptionForReject, accessToken)
        .then(res => {
          setToastColor(colors.green);
          toast.current.show("Ret işlemi başarılı.", 1000);
          handleCloseModalForDeny();
          setIzinRequests(prev =>
            prev.filter(item => item.id !== selectedIzinForReject.id)
          );
        })
        .catch(err => {
          console.log(err);
          setToastColor(colors.red);
          setDenyRequestLoading(false);
          toast.current.show(
            "Ret işleminde beklenmedik hata meydana geldi.",
            1000
          );
        });
    } else {
      setToastColor(colors.red);
      toast.current.show("Ret açıklamasının doldurulması gerekmektedir.", 1000);
    }
  };

  const handleSelectForDeny = item => {
    setIsDenyModalOpen(true);
    setSelectedIzinForReject(item);
  };

  const handleCloseModalForDeny = () => {
    setIsDenyModalOpen(false);
    setSelectedIzinForReject(null);
  };

  // APPROVE HANDLING
  const sendApproveRequest = () => {
    setApproveRequestLoading(true);
    approveIzin(selectedIzinForApprove.id, accessToken)
      .then(res => {
        setApproveRequestLoading(false);
        if (!res.data.hasError) {
          setToastColor(colors.green);
          toast.current.show("İzin talebi onayı başarılı", 1000);
          handleCloseModalForApprove();
          setIzinRequests(prev =>
            prev.filter(item => item.id !== selectedIzinForApprove.id)
          );
        } else {
          handleCloseModalForApprove();
          setToastColor(colors.red);
          toast.current.show(res.data.message, 1000);
        }
      })
      .catch(err => {
        setApproveRequestLoading(false);
        handleCloseModalForApprove();
        setToastColor(colors.red);
        toast.current.show("İzin talebi onayı başarısız.", 1000);
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
        data={izinRequests}
        keyExtractor={item => item.id}
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
            approveButtonText="Onayla"
            denyButtonText="Reddet"
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
            <SezinTitle text="İzin Talebi Onayı" />
            <SezinDescription
              text="Buradan onay veya ret işleminde bulunmanız gereken izin taleplerine 
              ulaşabilirsiniz."
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

      <GetInfoBeforeActionModal
        isModalOpen={isDenyModalOpen}
        onBackdropPress={() => setIsDenyModalOpen(false)}
        onChangeModalText={text => setDescriptionForReject(text)}
        onCloseButtonPressed={handleCloseModalForDeny.bind(this)}
        onApproveButtonPressed={sendDenyRequest.bind(this)}
        loadingApproveButton={denyRequestLoading}
        approveButtonColor={colors.red}
        approveButtonHighlightColor={colors.darkRed}
        descriptionText="Personelin izin talebini reddetmek istediğinize emin misiniz?"
        inputLabel="Ret Gerekçesi"
        headerText="İzin Talebi Reddet"
        approveButtonText="Reddet"
      />
      <AskAgainBeforeActionModal
        isModalOpen={isApproveModalOpen}
        onBackdropPress={handleCloseModalForApprove.bind(this)}
        onCloseButtonPressed={handleCloseModalForApprove.bind(this)}
        onApproveButtonPressed={sendApproveRequest.bind(this)}
        loadingApproveButton={approveRequestLoading}
        approveButtonColor={colors.green}
        approveButtonHighlightColor={colors.darkGreen}
        descriptionText="Personelin izin talebini onaylamak istediğinize emin misiniz?"
        headerText="İzin Talebi Onayla"
        approveButtonText="Onayla"
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

IzinOnayScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default IzinOnayScreen;
