import React from "react";
import { View, LogBox, Text, Button } from "react-native";

import AppButton from "../AppButton";
import colors from "../colors";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function WalletPage() {
  return (
    <View style={{ backgroundColor: "white", marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 6, margin: 10 }}>
        Total Balance
      </Text>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>$0.00</Text>
      <View
        style={{
          flexDirection: "row",
          borderRadius: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <AppButton
          title="Withdraw"
          style={{ width: "40%", marginTop: 10, fontSize: 20, padding: 0,  }}
        />

        <AppButton
          title="Deposit"
          style={{ width: "40%", marginLeft: 20, marginTop: 10, padding: 0 }}
        /> */}
        <View style={{ margin: 10 }}>
          <Button title="Withdraw" color={colors.primary} />
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Deposit" color={colors.primary} />
        </View>
      </View>
    </View>
  );
}
