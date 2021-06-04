import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

export class BSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => {
    this.setState({ show: true });
  };
  close = () => {
    this.setState({ show: false });
  };
  render() {
    let { show } = this.state;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "purple",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
        </View>
      </Modal>
    );
  }
}

export default BSheet;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "yellowgreen",
    shadowColor: "purple",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    borderRadius: 4,
    height: 8,
    backgroundColor: "blue",
    marginBottom: 10,
  },
});
