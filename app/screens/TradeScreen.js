import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ActiveButton from "../components/ActiveButton";
import colors from "../components/colors";
import AppText from "../components/AppText";
import PercentageDiffText from "../components/PercentageDiffText";
import TextButton from "../components/TextButton";
import AppButton from "../components/AppButton";
import { Button } from "react-native-elements/dist/buttons/Button";

function TradeScreen() {
  const priceInitialText = "Amount";
  const route = useRoute();
  const [isBuying, setBuying] = useState(true);
  const [price, setPrice] = useState(priceInitialText);
  const [convertedPrice, setConvertedPrice] = useState("0");

  const { coinName, exchangerate, coinPrice, coinSymbol } = route.params;
  console.log(coinName);

  const changeTrade = (value) => {
    setPrice(priceInitialText);
    setConvertedPrice("0");
    setBuying(value);
  };

  function NumPadRow({ text1, text2, text3 }) {
    let numPadStyle = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 5,
        elevation: 2,
        justifyContent: "space-evenly",
      },

      textContainerStyle: {
        flex: 1,
        justifyContent: "center",
      },

      numberStyle: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "300",
      },
    });

    const converter = (value) => {
      if (isBuying) {
        return parseFloat(value) / coinPrice;
      } else {
        return coinPrice / parseFloat(value);
      }
    };

    const onPress = (val) => {
      let tempPrice = price;
      if (price === priceInitialText) tempPrice = "";
      if (val === "ESC") {
        tempPrice = tempPrice.slice(0, tempPrice.length - 1);
        setPrice(tempPrice);
      } else if (val === ".") {
        if (price.indexOf(".") === -1 && price !== priceInitialText) {
          setPrice(tempPrice + val);
        } else {
          return;
        }
      } else {
        setPrice(tempPrice + val);
      }

      if (val !== "ESC") {
        let cPrice = converter(tempPrice + val);
        setConvertedPrice(cPrice.toString());
      } else {
        if (tempPrice.length === 0) {
          setPrice(priceInitialText);
          tempPrice = "0";
        }
        let cPrice = converter(tempPrice);
        setConvertedPrice(cPrice.toString());
      }
    };

    return (
      <View style={numPadStyle.container}>
        <TextButton
          containerStyle={numPadStyle.textContainerStyle}
          btnTextStyle={numPadStyle.numberStyle}
          title={text1}
          onPress={() => onPress(text1)}
        />
        <TextButton
          containerStyle={numPadStyle.textContainerStyle}
          btnTextStyle={numPadStyle.numberStyle}
          title={text2}
          onPress={() => onPress(text2)}
        />
        <TextButton
          containerStyle={numPadStyle.textContainerStyle}
          btnTextStyle={numPadStyle.numberStyle}
          title={text3}
          onPress={() => onPress(text3)}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.primaryContainer}>
        <View style={styles.inputTextContainer}>
          <View
            style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}
          >
            <Text style={{ fontSize: 13, margin: 10 }}>
              {isBuying ? exchangerate : coinSymbol.toUpperCase()}
            </Text>
            <Text style={styles.initialTextInput}>{price}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ fontSize: 13, margin: 10 }}>
              {!isBuying ? exchangerate : coinSymbol.toUpperCase()}
            </Text>
            <Text style={styles.convertedTextContainer}>{convertedPrice}</Text>
          </View>
        </View>
        <View style={styles.buySellContainer}>
          <TouchableOpacity onPress={() => changeTrade(true)}>
            <ActiveButton isActive={!isBuying} title="BUY" />
          </TouchableOpacity>
          <View
            style={[
              styles.arrowContainer,
              { transform: [{ rotate: isBuying ? "0deg" : "180deg" }] },
            ]}
          >
            <AntDesign style={styles.activeArrow} size={20} name="arrowup" />
            <AntDesign style={{ color: "black" }} size={20} name="arrowdown" />
          </View>
          <TouchableOpacity onPress={() => changeTrade(false)}>
            <ActiveButton isActive={isBuying} title="SELL" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondaryContainer}>
        <NumPadRow text1="1" text2="2" text3="3" />
        <NumPadRow text1="4" text2="5" text3="6" />
        <NumPadRow text1="7" text2="8" text3="9" />
        <NumPadRow text1="." text2="0" text3="ESC" />
        <AppButton
          onPress={() => {
            alert("Please deposit amount in wallet");
          }}
          title="Pay"
        />
      </View>
    </View>
  );
}

export default TradeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryContainer: {
    flexDirection: "row",
    backgroundColor: colors.disabled,
    padding: 15,
    width: "100%",
  },

  inputTextContainer: {
    flex: 0.7,
  },

  buySellContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinNameStyle: {
    color: "black",
    fontSize: 30,
    marginVertical: 10,
  },

  secondaryContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  marketTextStyle: {
    fontSize: 20,
  },

  activeArrow: {
    color: "blue",
  },

  convertedTextContainer: {
    fontSize: 28,
  },

  bitCoinImage: {
    width: 50,
    height: 50,
  },

  initialTextInput: {
    width: "100%",
    flex: 1,
    fontSize: 35,
  },
});
