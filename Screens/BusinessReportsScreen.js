//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
// REDUX
import { useSelector } from "react-redux";

// SEZIN COMPONENTS
import SezinHeader from "../components/General/SezinHeader";
import SezinSingleBusinessReport from "../components/General/SezinSingleBusinessReport";
import SezinTitle from "../components/Typography/SezinTitle";
import SezinBadge from "../components/Buttons/SezinBadge";
import { colors } from "../assets/styles/colors";
// SEZIN SERVICES
import {
  getBusinessReportsByMe,
  getBusinessReportsOnMe
} from "../services/business-report-service";

// create a component
const BusinessReportsScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  // MAIN DATA
  const [businessReports, setBusinessReports] = useState([]);
  // CURRENT PAGE
  const [currentPage, setCurrentPage] = useState(1);
  // HANDLES IF DATA END OR NOT.
  const [dataEnd, setDataEnd] = useState(false);
  // BOTTOM LOADING STATE
  const [loadingState, setLoadingState] = useState(false);
  // LOADING STATE AT FIRST WITH NO DATA AT ALL
  const [topLoadingState, setTopLoadingState] = useState(false);
  // BUSINESS STATUS FOR DIFFERENT API CALLS AT START
  const [createdByMe, setCreatedByMe] = useState(false);

  // REACT TO CHANGES ON BUSINESS ORDER TYPE
  useEffect(() => {
    // HANDLE CURRENT PAGE ON BUSINESS ORDER TYPE CHANGE.
    setCurrentPage(1);
    setDataEnd(false);
    setTopLoadingState(true);
    // EMPTY LIST
    setBusinessReports([]);
  }, [createdByMe]);

  // MAKE API CALL AFTER PAGE IS EQUAL TO 1 AGAIN
  useEffect(() => {
    if (currentPage === 1) {
      if (createdByMe) {
        getBusinessReportsByMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessReports(prev => [...prev, ...res.data.result]);
            } else {
              setDataEnd(true);
            }
            setTopLoadingState(false);
          })
          .catch(err => {
            setTopLoadingState(false);
          });
      } else {
        getBusinessReportsOnMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessReports(prev => [...prev, ...res.data.result]);
            } else {
              setDataEnd(true);
            }
            setTopLoadingState(false);
          })
          .catch(err => {
            setTopLoadingState(false);
          });
      }
    }
  }, [currentPage]);

  const _loadData = () => {
    setLoadingState(true);
    if (!dataEnd) {
      if (createdByMe) {
        getBusinessReportsByMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessReports(prev => [...prev, ...res.data.result]);
            } else {
              setDataEnd(true);
            }
            setLoadingState(false);
          })
          .catch(err => {
            setLoadingState(false);
          });
      } else {
        getBusinessReportsOnMe(currentPage, 5, accessToken)
          .then(res => {
            if (res.data.result.length > 0) {
              setCurrentPage(prev => prev + 1);
              setBusinessReports(prev => [...prev, ...res.data.result]);
            } else {
              setDataEnd(true);
            }
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

  return (
    <View style={styles.container}>
      <FlatList
        data={businessReports}
        keyExtractor={(item, index) => `${item.areaTrackId}`}
        renderItem={({ item, index }) => (
          <SezinSingleBusinessReport
            title={item.title}
            description={item.description}
            date={item.createDateValue}
            createdByMe={createdByMe}
            userList={item.sendUserList}
            creatorPerson={item.createdUser}
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
            <SezinTitle text="Saha Takibi" textStyle={{}} />
            <View style={styles.badgeContainer}>
              <SezinBadge
                onPress={() =>
                  !topLoadingState && !loadingState && setCreatedByMe(false)
                }
                text="Gelenler"
                color={!createdByMe ? colors.blue : "white"}
                width={(Dimensions.get("window").width - 60) / 2}
                textStyle={{ color: !createdByMe ? "white" : colors.blue }}
                borderColor={colors.blue}
              />
              <SezinBadge
                onPress={() =>
                  !topLoadingState && !loadingState && setCreatedByMe(true)
                }
                text="Oluşturduklarım"
                color={createdByMe ? colors.blue : "white"}
                width={(Dimensions.get("window").width - 60) / 2}
                textStyle={{ color: createdByMe ? "white" : colors.blue }}
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

BusinessReportsScreen.navigationOptions = {
  header: null
};

//make this component available to the app
export default BusinessReportsScreen;
