import { Platform } from "react-native";
import colors from "../components/colors";

export default {
  color: colors,
  text: {
    color: colors.light,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
