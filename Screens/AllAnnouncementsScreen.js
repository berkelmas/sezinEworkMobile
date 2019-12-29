//import liraries
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import { colors } from "../assets/styles/colors";

// MATERIAL INDICATOR
import { MaterialIndicator } from "react-native-indicators";

// FAKE DATA
import { announcements as announcementsFakeData } from "../assets/data/announcements.data";

// CUSTOM COMPONENT
import SezinSingleAnnouncement from "../components/General/SezinSingleAnnouncement";

// create a component
const AllAnnouncementsScreen = props => {
  const [announcements, setAnnouncements] = React.useState(null);
  const [loadingState, setLoadingState] = React.useState(false);

  React.useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setAnnouncements(announcementsFakeData.slice(0, 5));
      setLoadingState(false);
    }, 1000);
  }, []);

  const _loadData = () => {
    setLoadingState(true);
    setTimeout(() => {
      setAnnouncements(prev => [
        ...prev,
        ...announcementsFakeData.slice(5, 10)
      ]);
      setLoadingState(false);
    }, 1500);
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
            {...item}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
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
  }
});

//make this component available to the app
export default AllAnnouncementsScreen;
