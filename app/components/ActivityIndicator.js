import React from "react";
import Lottie from "lottie-react-native";

function ActivityIndicator(props) {
  return (
    <Lottie
      loop
      autoPlay
      style={props.style}
      source={require("../assets/animations/loading.json")}
    />
  );
}

export default ActivityIndicator;
