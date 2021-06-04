import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddCard from "../components/ProfileCards/AddCardBottomSheet";

import HelpAndSupport from "../components/ProfileCards/HelpAndSupport";
import WalletBottomSheet from "../components/ProfileCards/WalletBottomSheet";

import ProfileComponent from "../components/ProfileComponent";
import AboutUs from "../screens/AboutUs";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import WalletPage from "../components/ProfileCards/WalletPage";
import CardPage from "../components/ProfileCards/CardPage";
import AssetAllocation from "../components/AssetAllocation";
import CurrencyConverter from "../components/CurrencyConverter";

const Stack = createStackNavigator();
// je ith  component declare kele ahet under Stack.Navigator tyache madhe apn navigation props pass karu shako
export default StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerStyle: { backgroundColor: "#FFE663" },
      headerTintColor: "black",
    }}
  >
    {/*by default this screen will shown first, because it is defined first*/}
    <Stack.Screen
      name="Profile"
      component={ProfileComponent}
      options={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        headerShown: false,
      }}
    />

    <Stack.Screen name="Wallet" component={WalletPage} />
    <Stack.Screen name="Card" component={CardPage} />
    <Stack.Screen name="AssetAllocation" component={AssetAllocation} />
    <Stack.Screen name="CurrencyConverter" component={CurrencyConverter} />
    <Stack.Screen
      name="HelpAndSupport"
      component={HelpAndSupport}
      options={{
        title: "Help And Support",
      }}
    />
    <Stack.Screen name="AboutUs" component={AboutUs} />
  </Stack.Navigator>
);
