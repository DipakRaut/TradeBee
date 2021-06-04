import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

class MyCard extends Component {
  render() {
    return (
      <View style={[cardStyle.card, { ...this.props.style }]}>
        {this.props.children}
      </View>
    );
  }
}

const cardStyle = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 8,
    margin: 8,
    padding: 10,
    elevation: 3,
    overflow: "hidden",
  },
});

export default MyCard;
