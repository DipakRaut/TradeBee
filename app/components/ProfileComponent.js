import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import AppButton from "./AppButton";
import Icon from "./icon";
import ListItem from "./ListItem";
import ItemContainer from "./ItemContainer";
import WalletBottomSheet from "./ProfileCards/WalletBottomSheet";
import Temp from "./RoughFile";
import UserProfile from "./UserProfile";
import AuthContext from "../auth/context";

const Items = [
  {
    title: "Wallet",
    icon: {
      name: "wallet",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "Wallet",
  },
  {
    title: "Add Card",
    icon: {
      name: "credit-card",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "Card",
  },
  {
    title: "Asset Allocation",
    icon: {
      name: "chart-bar-stacked",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "AssetAllocation",
  },
  {
    title: "Currency Converter",
    icon: {
      name: "currency-sign",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "CurrencyConverter",
  },
  {
    title: "Help And Support",
    icon: {
      name: "help-circle",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "HelpAndSupport",
  },
  {
    title: "About Us",
    icon: {
      name: "nature-people",
      backgroundColor: "white",
    },

    iconColor: "black",
    targetScreen: "AboutUs",
  },
];
function ProfileComponent({ navigation }) {
  const temp = useContext(AuthContext);
  return (
    <ScrollView>
      <UserProfile />
      <View style={styles.ComponentContainer}>
        <View style={styles.listItems}>
          <FlatList
            data={Items}
            keyExtractor={(menuItem) => menuItem.title}
            renderItem={({ item }) => (
              <ItemContainer
                title={item.title}
                IconComponent={
                  <Icon
                    iconName={item.icon.name}
                    size={45}
                    backgroundColor={item.icon.backgroundColor}
                    iconColor={item.iconColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
          />
          <View style={styles.container}>
            <TouchableHighlight>
              <Text style={styles.button} onPress={() => temp.setUser()}>
                Log Out
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileComponent;

const styles = StyleSheet.create({
  ComponentContainer: { justifyContent: "center", alignItems: "center" },
  listItems: {
    paddingLeft: 10,
    backgroundColor: "#FFE663",
    width: "95%",
    borderRadius: 20,
  },

  container: {
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    width: "80%",
    padding: 7,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    color: "black",
    fontSize: 25,
    alignSelf: "center",
  },
});
