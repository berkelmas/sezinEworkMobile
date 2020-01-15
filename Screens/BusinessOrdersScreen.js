//import libraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

// SEZIN COMPONENTS
import SezinSingleBusinessOrder from "../components/General/SezinSingleBusinessOrder";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinBadge from "../components/Buttons/SezinBadge";
import SezinInformationModal from "../components/Modal/SezinInformationModal";
import { colors } from "../assets/styles/colors";

// MATERIAL INDICATOR
import { MaterialIndicator } from "react-native-indicators";
// REDUX
import { useSelector } from "react-redux";
// WEB SERVICES
import {
  getBusinessOrderByMe,
  getBusinessOrdersOnMe,
  getSingleBusinessOrderActivities
} from "../services/business-order-service";

// create a component
const BusinessOrdersScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  // MAIN DATA
  const [businessOrders, setBusinessOrders] = useState(null);
  // CURRENT PAGE
  const [currentPage, setCurrentPage] = useState(1);
  // HANDLES IF DATA END OR NOT.
  const [dataEnd, setDataEnd] = useState(false);
  // BOTTOM LOADING STATE
  const [loadingState, setLoadingState] = useState(false);
  // LOADING STATE AT FIRST WITH NO DATA AT ALL
  const [topLoadingState, setTopLoadingState] = useState(false);
  // BUSINESS STATUS FOR DIFFERENT API CALLS AT START
  const [assignedByMe, setAssignedByMe] = useState(false);
  // INFORMATION MODAL FOR ASSIGNED PEOPLE ACTIVITIES
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  // ACTIVITY INFORMATION FOR SELECTED BUSINESS ORDER.
  const [
    selectedBusinessOrderActivityInformation,
    setSelectedBusinessOrderActivityForInformation
  ] = useState(null);
  // LOADING STATE FOR SELECTED BUSINESS ORDER TO SHOW LOADING SPINNER ON MODAL
  const [
    businessOrderActivityLoading,
    setBusinessOrderActivityLoading
  ] = useState(false);

  // REACT TO CHANGES ON BUSINESS ORDER TYPE
  useEffect(() => {
    // HANDLE CURRENT PAGE ON BUSINESS ORDER TYPE CHANGE.
    setCurrentPage(1);
    setDataEnd(false);

    if (assignedByMe) {
      setTopLoadingState(true);
      // EMPTY LIST
      setBusinessOrders([]);
      getBusinessOrderByMe(currentPage, 5, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setCurrentPage(prev => prev + 1);
            setBusinessOrders(prev => [...prev, ...res.data.result]);
          }
          setDataEnd(true);
          setTopLoadingState(false);
        })
        .catch(err => {
          setLoadingState(false);
        });
    } else {
      setTopLoadingState(true);
      // EMPTY LIST
      setBusinessOrders([]);
      getBusinessOrdersOnMe(1, 5, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setCurrentPage(prev => prev + 1);
            setBusinessOrders(prev => [...prev, ...res.data.result]);
          }
          setTopLoadingState(false);
        })
        .catch(err => {
          setLoadingState(false);
        });
    }
  }, [assignedByMe]);

  const _loadData = () => {
    setLoadingState(true);
    if (!dataEnd) {
      if (assignedByMe) {
        getBusinessOrderByMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessOrders(prev => [...prev, ...res.data.result]);
            }
            setDataEnd(true);
            setLoadingState(false);
          })
          .catch(err => {
            setLoadingState(false);
          });
      } else {
        getBusinessOrdersOnMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessOrders(prev => [...prev, ...res.data.result]);
            }
            setDataEnd(true);
            setLoadingState(false);
          })
          .catch(err => {
            setLoadingState(false);
          });
      }
    } else {
      setLoadingState(false);
    }
  };

  const _renderPriority = param => {
    switch (param) {
      case 0:
        return "Düşük Öncelikli İş Emri";
      case 1:
        return "Normal Öncelikli İş Emri";
      case 2:
        return "Yüksek Öncelikli İş Emri";
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={businessOrders}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <SezinSingleBusinessOrder
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            place={_renderPriority(item.priorityEnum)}
            {...item}
            status={item.statusEnum}
            deadline="23 Mart"
            createdBy={item.createdUser}
            assignedByMe={assignedByMe}
            assignedPeople={[]}
            onMoreDetailsButtonPressed={() => {
              setBusinessOrderActivityLoading(true);
              setIsInformationModalOpen(true);

              getSingleBusinessOrderActivities(
                item.documentationNo,
                accessToken
              ).then(res => {
                setSelectedBusinessOrderActivityForInformation(res.data.result);
                setBusinessOrderActivityLoading(false);
              });
            }}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={() => !loadingState && !topLoadingState && _loadData()}
        ListHeaderComponent={() => (
          <View>
            {/* HEADER PART */}
            <SezinHeader
              onPressLeft={() => props.navigation.toggleDrawer()}
              leftIconName="bars"
              containerStyle={{
                paddingTop: 30
              }}
            />
            <SezinTitle text="İş Emirleri" textStyle={{}} />
            <View style={styles.badgeContainer}>
              <SezinBadge
                onPress={() =>
                  !topLoadingState && !loadingState && setAssignedByMe(false)
                }
                text="Üzerimdeki İşler"
                color={!assignedByMe ? colors.blue : "white"}
                width={(Dimensions.get("window").width - 60) / 2}
                textStyle={{ color: !assignedByMe ? "white" : colors.blue }}
                borderColor={colors.blue}
              />
              <SezinBadge
                onPress={() =>
                  !topLoadingState && !loadingState && setAssignedByMe(true)
                }
                text="Verdiğim İşler"
                color={assignedByMe ? colors.blue : "white"}
                width={(Dimensions.get("window").width - 60) / 2}
                textStyle={{ color: assignedByMe ? "white" : colors.blue }}
                borderColor={colors.blue}
              />
            </View>
            {topLoadingState && (
              <View
                style={{
                  height: 300,
                  width: 100,
                  backgroundColor: "white",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <MaterialIndicator color={colors.blue} size={60} />
              </View>
            )}
          </View>
        )}
        ListFooterComponent={() => {
          if (loadingState) {
            return (
              <View style={styles.footerSpinnerContainer}>
                <MaterialIndicator color={colors.blue} size={50} />
              </View>
            );
          } else if (dataEnd) {
            return (
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Gösterilecek Duyuru Kalmadı.
                </Text>
              </View>
            );
          } else {
            return null;
          }
        }}
      />

      <SezinInformationModal
        isModalOpen={isInformationModalOpen}
        activitiesArray={selectedBusinessOrderActivityInformation}
        headerText="İş Emri Detayları"
        onBackdropPress={() => setIsInformationModalOpen(false)}
        onCloseButtonPressed={() => setIsInformationModalOpen(false)}
        loadingState={businessOrderActivityLoading}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  footerSpinnerContainer: {
    height: 100,
    width: 100,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
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
  }
});

//make this component available to the app
export default BusinessOrdersScreen;
