// import React, { useState } from "react";
// import Cards from "react-credit-cards";
// import "react-credit-cards/es/styles-compiled.css";

// export default function AddCard() {
//   const [number, setNumber] = useState("");
//   const [name, setName] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvc, setCvc] = useState("");
//   const [focus, setFocus] = useState("");

//   return (
//     <View>
//       <form
//         input
//         type="tel"
//         name="number"
//         placeholder="Card Number"
//         value={number}
//         onChange={(e) => setNumber(e.target.value)}
//         onFocus={(e) => setFocus(e.target.name)}
//       />
//     </View>
//   );
// }

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

  const renderContent = () => (
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

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 300, 0]}
        borderRadius={30}
        renderContent={renderContent}
      />
    </>
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
