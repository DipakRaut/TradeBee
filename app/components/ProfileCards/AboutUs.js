import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import StatusBarScreen from "../StatusBarScreen";

function AboutUs(props) {
  return (
    <StatusBarScreen>
      <View style={styles.container}>
        <AppText
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: 16,
          }}
        >
          Our Goal is to make Cryptocurrency Payments Easy, safe and Universally
          accepted that people never feel the need to carry cash ot cards again
          all the Money will be De-centralized. We believe India is at the cusp
          of a new Mobile revolution Which will change the way we Manage our
          Money on the go. We see ourselves facilitating this change, through
          technology and dogged customer centricity.
        </AppText>
        <AppText
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: 16,
          }}
        >
          TradeBee is a brand owned by TradeBee Private Limited (Formerly known
          as JX Pooler Pvt Ltd.). It is licensed by the Reserve Bank Of India
          for issuance and operation of a Semi Closed Prepaid Payment System.
        </AppText>
      </View>
    </StatusBarScreen>
  );
}

export default AboutUs;

const styles = StyleSheet.create({
  container: {},
});
