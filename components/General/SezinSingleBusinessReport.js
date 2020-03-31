//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  ViewPropTypes,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import { Tooltip } from "react-native-elements";

import moment from "moment";
import "moment/locale/tr"; // without this line it didn't work

// ASSETS
import RaporImage1 from "../../assets/images/rapor.jpg";
import { colors } from "../../assets/styles/colors";

import { createHTML } from "../../utilities/create-html.functions";

// create a component
const SezinSingleBusinessReport = props => {
  const [height, setHeight] = useState(0);

  const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={RaporImage1} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>
          {moment(props.date)
            .locale("tr")
            .format("ll")}
        </Text>
        <Text style={styles.titleText}>{props.title}</Text>

        <View style={{ height }}>
          <WebView
            automaticallyAdjustContentInsets={false}
            useWebKit={true}
            startInLoadingState={true}
            source={{ html: createHTML(props.description) }}
            onMessage={event => {
              console.log(event.nativeEvent);
              setHeight(parseInt(event.nativeEvent.data));
            }}
            javaScriptEnabled={true}
            injectedJavaScript={webViewScript}
            domStorageEnabled={true}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        ></View>
        {props.createdByMe && props.userList ? (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 6,
              paddingTop: 15
            }}
          >
            <Text style={styles.bottomTexts}>Atananlar:</Text>
            <Tooltip
              containerStyle={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowOpacity: 0.15,
                shadowRadius: 7,

                elevation: 9
              }}
              height={40 + props.userList.slice(0, 20).length * 20}
              width={200}
              backgroundColor={colors.lightGray}
              popover={
                <View>
                  {props.userList.slice(0, 20).map((item, index) => (
                    <Text
                      key={index}
                      style={{
                        fontFamily: "Airbnb-Light",
                        fontSize: 15,
                        color: colors.dark
                      }}
                    >
                      - {item}
                    </Text>
                  ))}
                  {props.userList.length >= 20 && (
                    <Text
                      style={{
                        fontFamily: "Airbnb-Light",
                        fontSize: 15,
                        color: colors.dark
                      }}
                    >
                      ...
                    </Text>
                  )}
                  {props.userList.length === 0 && (
                    <>
                      <Text
                        style={{
                          fontFamily: "Airbnb-Light",
                          fontSize: 15,
                          color: colors.dark
                        }}
                      >
                        Kullanıcı Yok
                      </Text>
                    </>
                  )}
                </View>
              }
            >
              <Text style={{ ...styles.bottomRightTexts }}>
                {props.userList && props.userList.length} Kişi
              </Text>
            </Tooltip>
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 6,
              paddingTop: 15
            }}
          >
            <Text style={styles.bottomTexts}>Oluşturan:</Text>
            <Text style={styles.bottomRightTexts}>{props.creatorPerson}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginVertical: 20
  },
  imageStyle: {
    borderRadius: 4,
    height: 200,
    width: "100%",
    resizeMode: "cover"
  },
  placeText: {
    color: colors.green,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book"
  },
  titleText: {
    color: colors.dark,
    fontSize: 21 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Book"
  },
  descriptionText: {
    color: colors.gray,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  bottomTexts: {
    color: colors.dark,
    fontSize: 15 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  },
  bottomRightTexts: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontFamily: "Airbnb-Light"
  }
});

SezinSingleBusinessReport.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdByMe: PropTypes.bool,
  userList: PropTypes.arrayOf(PropTypes.string),
  creatorPerson: PropTypes.string
};

//make this component available to the app
export default React.memo(SezinSingleBusinessReport);
