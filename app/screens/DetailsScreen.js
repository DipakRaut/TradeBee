import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native-elements";
function DetailsScreen(props) {
  const route = useRoute();
  const { coinName } = route.params;

  return <Text>Hello World</Text>;
}

export default DetailsScreen;
