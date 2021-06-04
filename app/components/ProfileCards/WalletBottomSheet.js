import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import AppButton from "../AppButton";

export default function WalletBottomSheet() {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Text style={{ fontWeight: "bold", marginBottom: 6 }}>Total Balance</Text>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>$1,209.32</Text>
      <View style={{ flexDirection: "row", borderRadius: 40 }}>
        <AppButton title="Withdraw" style={styles.button} />
        <AppButton title="Deposit" />
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

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
        snapPoints={[320, 200, 0]}
        borderRadius={30}
        renderContent={renderContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
