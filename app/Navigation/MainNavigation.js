import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigation from "./ProfileNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MarketScreen from "../screens/MarketScreen";
import TradeScreen from "../screens/TradeScreen";
import { NavigationContainer } from "@react-navigation/native";
import DetailsScreen from "../screens/DetailsScreen";
import GraphScreen from "../screens/GraphScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        backBehavior="initialRoute"
        tabBarOptions={{
          activeBackgroundColor: "#FFE663",
          activeTintColor: "black",
          inactiveBackgroundColor: "white",
          inactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-cube-sharp" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="GraphScreen"
          component={GraphScreen}
          initialParams={{
            coinName: "null",
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-bar-chart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              /> // suggesting by react native
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
