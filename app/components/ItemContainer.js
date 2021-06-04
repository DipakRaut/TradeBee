import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Colors from "./colors";
import AppText from "./AppText";
import colors from "./colors";

function ItemContainer({ title, IconComponent, style, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={onPress}
      style={{ marginBottom: 10, marginTop: 10 }}
    >
      <View style={[styles.userContainer, style]}>
        {IconComponent}

        <View style={styles.description}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default ItemContainer;

const styles = StyleSheet.create({
  userContainer: {
    // padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontWeight: "500",
    color: "black",
  },
  description: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
});
