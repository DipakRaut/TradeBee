import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import { BottomSheet } from "react-native-btr";
import AppButton from "./AppButton";

const App = () => {
  const [visible, setVisible] = useState(false);

  const toggleBottonNavView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
          }}
        ></Text>
        <Button onPress={toggleBottonNavView} title="Show Bottom Sheet" />
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottonNavView}
          onBackdropPress={toggleBottonNavView}
        >
          <View style={{ backgroundColor: "white" }}>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
              Total Balance
            </Text>
            <Text style={{ fontSize: 40, marginBottom: 20 }}>$1,209.32</Text>
            <View style={{ flexDirection: "row", borderRadius: 40 }}>
              <AppButton
                title="Withdraw"
                style={{ backgroundColor: "purple" }}
              />
              <AppButton title="Deposit" />
            </View>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
