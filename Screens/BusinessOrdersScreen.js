//import libraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

// SEZIN COMPONENTS
import SezinSingleBusinessOrder from "../components/General/SezinSingleBusinessOrder";
import SezinHeader from "../components/General/SezinHeader";
import SezinTitle from "../components/Typography/SezinTitle";
import { colors } from "../assets/styles/colors";

// MATERIAL INDICATOR
import { MaterialIndicator } from "react-native-indicators";

// FAKE DATA
import {
  businessOrdersData as fakeBusinessOrdersDataOnMe,
  businessOrdersDataByMe as fakeBusinessOrdersDataByMe
} from "../assets/data/business-orders.data";
import SezinBadge from "../components/Buttons/SezinBadge";
import SezinInformationModal from "../components/Modal/SezinInformationModal";

// create a component
const BusinessOrdersScreen = props => {
  const [businessOrders, setBusinessOrders] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [topLoadingState, setTopLoadingState] = useState(false);
  const [assignedByMe, setAssignedByMe] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  // REACT TO CHANGES ON BUSINESS ORDER TYPE
  React.useEffect(() => {
    if (assignedByMe) {
      setTopLoadingState(true);
      // EMPTY LIST
      setBusinessOrders([]);
      setTimeout(() => {
        setBusinessOrders(fakeBusinessOrdersDataByMe.slice(0, 4));
        setTopLoadingState(false);
      }, 1000);
    } else {
      setTopLoadingState(true);
      // EMPTY LIST
      setBusinessOrders([]);
      setTimeout(() => {
        setBusinessOrders(fakeBusinessOrdersDataOnMe.slice(0, 4));
        setTopLoadingState(false);
      }, 1000);
    }
  }, [assignedByMe]);

  const _loadData = () => {
    setLoadingState(true);
    if (assignedByMe) {
      setTimeout(() => {
        setBusinessOrders(prev => [
          ...prev,
          ...fakeBusinessOrdersDataByMe.slice(4, 8)
        ]);
        setLoadingState(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setBusinessOrders(prev => [
          ...prev,
          ...fakeBusinessOrdersDataOnMe.slice(4, 8)
        ]);
        setLoadingState(false);
      }, 1500);
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
            {...item}
            deadline="23 Mart"
            createdBy={item.createdBy}
            status="Tamamlandı"
            assignedByMe={assignedByMe}
            assignedPeople={item.assignedOn}
            onMoreDetailsButtonPressed={() => setIsInformationModalOpen(true)}
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
            <SezinTitle text="İş Emirleri" textStyle={{}} />
            <View style={styles.badgeContainer}>
              <SezinBadge
                onPress={() => setAssignedByMe(false)}
                text="Üzerimdeki İşler"
                color={!assignedByMe ? colors.blue : "white"}
                width={(Dimensions.get("window").width - 60) / 2}
                textStyle={{ color: !assignedByMe ? "white" : colors.blue }}
                borderColor={colors.blue}
              />
              <SezinBadge
                onPress={() => setAssignedByMe(true)}
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

      <SezinInformationModal
        isModalOpen={isInformationModalOpen}
        descriptionComponent={<Text>Berk Elmas</Text>}
        headerText="İş Emri Detayları"
        onBackdropPress={() => setIsInformationModalOpen(false)}
        onCloseButtonPressed={() => setIsInformationModalOpen(false)}
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
  }
});

//make this component available to the app
export default BusinessOrdersScreen;
