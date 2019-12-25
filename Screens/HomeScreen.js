import React from "react";
import { View, Text, StyleSheet } from "react-native";

// REDUX
import { connect, useSelector } from "react-redux";

const HomeScreen = props => {
  const username = useSelector(state => state.AuthReducer.username);

  return (
    <View style={styles.container}>
      <Text>Home Page... {username} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  username: state.AuthReducer.username
});

export default connect(mapStateToProps)(HomeScreen);
