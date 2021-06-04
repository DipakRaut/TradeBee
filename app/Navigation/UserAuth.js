import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import MarketScreen from "../screens/MarketScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  // const navigation = useNavigation();

  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      // options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
