import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "./colors";
import AppText from "./AppText";
import colors from "./colors";

function ListItem({
  image,
  title,
  subtitle,
  onPress,

  IconComponent,
  chevron,
  refer,
  style,
}) {
  return (
    <TouchableWithoutFeedback underlayColor={colors.light}>
      <View style={[styles.userContainer, style]}>
        {IconComponent}
        {image && <Image style={styles.imageContainer} source={image} />}
        <View style={styles.description}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subtitle && (
            <AppText style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </AppText>
          )}
        </View>
        <TouchableOpacity>
          <View style={{ paddingTop: 50, flexDirection: "row-reverse" }}>
            <AppText style={styles.refer}>{refer}</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  userContainer: {
    // padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    height: 75,
    width: 75,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    color: "black",
  },
  subtitle: {
    color: Colors.medium,
    fontSize: 13,
  },

  description: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  refer: {
    color: "dodgerblue",
    fontSize: 15,
    fontWeight: "bold",
  },
});
