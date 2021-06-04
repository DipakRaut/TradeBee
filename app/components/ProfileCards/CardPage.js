import React, { Component, useState } from "react";
import { View, UIManager, StyleSheet, LogBox, Button } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { CreditCardInput } from "react-native-credit-card-input";
import AppButton from "../AppButton";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function AddCard() {
  const [number, setNumber] = useState();
  const [cvc, setcvc] = useState();
  const [expiry, setExpiry] = useState();

  const sheetRef = React.useRef(null);
  _onChange = (formData) => {
    setNumber(formData.values.number),
      setcvc(formData.values.cvc),
      setExpiry(formData.values.expiry);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View style={styles.container}>
        <CreditCardInput
          autoFocus
          requireName={true}
          requireCVC={true}
          requirePostalCode={true}
          validColor="black"
          invalidColor="red"
          placeholderColor="darkgray"
          labelStyle={{ color: "black", fontSize: 12 }}
          inputStyle={{ color: "black", fontSize: 16 }}
          onChange={_onChange}
        />
        <View style={styles.button}>
          <AppButton
            title="Save"
            onPress={() =>
              console.log(
                "CVC ->" +
                  cvc +
                  "  " +
                  "Number-> " +
                  number +
                  "Expiry->" +
                  expiry
              )
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    marginRight: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
