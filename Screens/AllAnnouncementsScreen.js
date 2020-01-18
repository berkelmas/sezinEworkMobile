//import liraries
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import { colors } from "../assets/styles/colors";

// MATERIAL INDICATOR
import { MaterialIndicator } from "react-native-indicators";

// FAKE DATA
import { announcements as announcementsFakeData } from "../assets/data/announcements.data";
import { getAnnouncements } from "../services/announcement-service";

// CUSTOM COMPONENT
import SezinSingleAnnouncement from "../components/General/SezinSingleAnnouncement";
import { useSelector } from "react-redux";
import ErrorStateComponent from "../components/Micro/ErrorStateComponent";

// create a component
const AllAnnouncementsScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [announcements, setAnnouncements] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endState, setEndState] = useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [errorState, setErrorState] = useState(false);

  const pushNewAnnouncements = pageSize => {
    if (accessToken && !endState && !loadingState) {
      setLoadingState(true);
      getAnnouncements(currentPage, pageSize, accessToken)
        .then(res => {
          if (res.data.result.length > 0) {
            setAnnouncements(prev => [...prev, ...res.data.result]);
            setCurrentPage(prev => prev + 1);
            setLoadingState(false);
          } else {
            setLoadingState(false);
            setEndState(true);
          }
        })
        .catch(err => {
          setErrorState(true);
          setLoadingState(false);
        });
    }
  };

  const _loadData = () => {
    pushNewAnnouncements(5);
  };

  const reloadAnnouncementsAgain = () => {
    setAnnouncements([]);
    setCurrentPage(1);
    setEndState(false);
    setErrorState(false);
  };

  useEffect(() => {
    if (!errorState) {
      pushNewAnnouncements(5);
    }
  }, [errorState]);

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item, index }) => (
          <SezinSingleAnnouncement
            contentContainerStyle={{
              marginBottom: 25,
              marginTop: index === 0 ? 20 : 0
            }}
            content={`${index} ${item.description}`}
            {...item}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.05}
        onEndReached={() => _loadData()}
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
            <SezinTitle text="Duyurular" textStyle={{}} />
            {errorState && (
              <ErrorStateComponent
                onPress={reloadAnnouncementsAgain.bind(this)}
              />
            )}
          </View>
        )}
        ListFooterComponent={() => {
          if (loadingState) {
            return (
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "white",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <MaterialIndicator color={colors.blue} size={50} />
              </View>
            );
          } else if (endState) {
            return (
              <View
                style={{
                  height: 60,
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Airbnb-Book",
                    fontSize: 15,
                    color: colors.gray
                  }}
                >
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
const styles = StyleSheet.create({});

//make this component available to the app
export default AllAnnouncementsScreen;
