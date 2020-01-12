//import liraries
import React, { useState } from "react";
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

// create a component
const AllAnnouncementsScreen = props => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [announcements, setAnnouncements] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endState, setEndState] = useState(false);
  const [loadingState, setLoadingState] = React.useState(false);

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
            console.log("KALMADI...");
          }
        })
        .catch(console.log);
    }
  };

  React.useEffect(() => {
    // setLoadingState(true);
    // setTimeout(() => {
    //   setAnnouncements(announcementsFakeData.slice(0, 5));
    //   setLoadingState(false);
    // }, 1000);
    pushNewAnnouncements(5);
  }, [accessToken]);

  const _loadData = () => {
    // setLoadingState(true);
    // setTimeout(() => {
    //   setAnnouncements(prev => [
    //     ...prev,
    //     ...announcementsFakeData.slice(5, 10)
    //   ]);
    //   setLoadingState(false);
    // }, 1500);
    pushNewAnnouncements(5);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        keyExtractor={(item, index) => String(index)}
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
