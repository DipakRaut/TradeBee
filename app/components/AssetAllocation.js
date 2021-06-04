import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

function AssetAllocation(props) {
  return (
    <View style={styles.container}>
      <AppText style={{ fontSize: 50 }}>Not Available</AppText>
    </View>
  );
}

export default AssetAllocation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
