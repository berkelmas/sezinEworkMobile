import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewPropTypes,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import PropTypes from "prop-types";
import IsTakibi from "../../assets/images/saha-takibi.jpg";
import { colors } from "../../assets/styles/colors";

const SezinSingleBusinessOrder = props => {
  const [statusColor, setStatusColor] = React.useState("white");
  const [businessStatus, setBusinessStatus] = React.useState(props.status);

  React.useEffect(() => {
    switch (businessStatus) {
      case "Tamamlandı":
        setStatusColor(colors.green);
        break;
      case "Başlanmadı":
        setStatusColor(colors.red);
        break;
      case "Yapılıyor":
        setStatusColor(colors.blue);
        break;
      default:
        break;
    }
  }, [businessStatus]);

  const _changeStatus = () => {
    switch (businessStatus) {
      case "Tamamlandı":
        setBusinessStatus("Başlanmadı");
        break;
      case "Başlanmadı":
        setBusinessStatus("Yapılıyor");
        break;
      case "Yapılıyor":
        setBusinessStatus("Tamamlandı");
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ ...styles.container, ...props.contentContainerStyle }}>
      <Image source={IsTakibi} style={styles.imageStyle} />
      {/* CONTENT CONTAINER */}
      <View style={{ padding: 10 }}>
        <Text style={styles.placeText}>{props.place}</Text>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.descriptionText}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using ‘Content here, content here’, making it
          look like readable English.
        </Text>

        {/* BOTTOM TEXT CONTAINER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
          }}
        >
          <Text style={styles.bottomTexts}>
            {props.assignedByMe ? "Verilen:" : "Oluşturan:"}
          </Text>
          <Text style={styles.bottomRightTexts}>{props.createdBy}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.bottomTexts}>Bitiş Tarihi:</Text>
          <Text style={styles.bottomRightTexts}>{props.deadline}</Text>
        </View>
        <TouchableOpacity
          onPress={_changeStatus.bind(this)}
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.bottomTexts}>Durum:</Text>
          <Text style={{ ...styles.bottomRightTexts, color: statusColor }}>
            {businessStatus}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

    elevation: 4
  },
  imageStyle: {
    borderRadius: 4,
    height: 300,
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

SezinSingleBusinessOrder.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  place: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdBy: PropTypes.string,
  deadline: PropTypes.string,
  status: PropTypes.string,
  assignedByMe: PropTypes.bool
};

export default SezinSingleBusinessOrder;