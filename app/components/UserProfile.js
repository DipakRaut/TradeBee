import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Button,
  Image,
  Platform,
} from "react-native";
import * as firebase from "firebase";
import ListItem from "./ListItem";
import MaterialCommunity from "./MaterialCommunity";

import MaterialIcon from "./MaterialIcon";
import * as ImagePicker from "expo-image-picker";
import AppText from "./AppText";
import AuthContext from "../auth/context";
import StatusBarScreen from "./StatusBarScreen";
function UserProfile({ props }) {
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    console.log("Image" + image);
  };

  // console.log(firebase.default.auth().currentUser.displayName);
  return (
    <StatusBarScreen>
      <View style={styles.InnerContainer}>
        <View style={styles.icon}>
          <MaterialIcon name="qr-code-scanner" size={30} />
          <View style={{ flexGrow: 1 }} />
          <MaterialCommunity name="theme-light-dark" size={30} />
        </View>

        <View style={styles.Usercontainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={pickImage}>
              {image === null ? (
                <Image
                  source={require("../assets/minion.jpg")}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    margin: 15,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    margin: 15,
                  }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <AppText style={{ color: "black", fontSize: 22 }}>
                {firebase.default.auth().currentUser.displayName}
              </AppText>
              <AppText
                style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
              >
                {user.email}
              </AppText>
            </View>
            <TouchableOpacity style={styles.refer}>
              <AppText
                style={{ color: "blue", fontSize: 20, fontWeight: "bold" }}
              >
                Refer
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StatusBarScreen>
  );
}

export default UserProfile;

const styles = StyleSheet.create({
  InnerContainer: {
    marginBottom: 10,
  },
  icon: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
  },
  Usercontainer: {
    width: "95%",
    backgroundColor: "#FFE663",
    borderRadius: 20,
    alignSelf: "center",
  },
  firstIcon: {
    position: "absolute",
  },
  sunMoon: {
    marginLeft: 270,
  },
  refer: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
    position: "absolute",
    justifyContent: "flex-end",
    right: 0,
    // margin: 20,
    // marginBottom: 5,
    padding: 8,
    paddingHorizontal: 10,
  },
});
