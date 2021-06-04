import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AppText from "../AppText";
import StatusBarScreen from "../StatusBarScreen";
import MaterialCommunity from "../MaterialCommunity";
import { FontAwesome5 } from "@expo/vector-icons";

function HelpAndSupport(props) {
  return (
    <StatusBarScreen>
      <ScrollView>
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <AppText style={{ fontSize: 30 }}>Help Center</AppText>
          </View> */}
          <View style={styles.selfService}>
            <AppText style={{ fontSize: 22, color: "black", marginLeft: 10 }}>
              Self Service
            </AppText>
          </View>

          <View>
            <TouchableOpacity style={styles.first}>
              <MaterialCommunity name="lock-reset" size={50} color="gray" />
              <AppText style={{ fontSize: 17, color: "black" }}>
                Reset Password
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reset}>
              <FontAwesome5 name="unlock-alt" size={40} color="gray" />
              <AppText style={{ fontSize: 17, color: "black" }}>
                Unlock Account
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reset}>
              <FontAwesome5 name="exchange-alt" size={40} color="gray" />
              <AppText style={{ fontSize: 17, color: "black" }}>
                Change Email-Address
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reset}>
              <MaterialCommunity name="laptop-mac" size={50} color="gray" />
              <AppText style={{ fontSize: 17, color: "black" }}>
                Tutorial
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </StatusBarScreen>
  );
}

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "purple",
  },
  header: {
    width: "100%",
    height: 100,
    fontSize: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  selfService: {
    color: "black",
  },

  reset: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  first: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
