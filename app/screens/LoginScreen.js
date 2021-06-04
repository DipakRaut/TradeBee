import React from "react";
import * as Font from "expo-font";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { Formik } from "formik";
import ErrorMessage from "../components/ErrorMessage";
import * as Yup from "yup";
import StatusBarScreen from "../components/StatusBarScreen";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import MyCard from "../components/MyCard";
import colors from "../components/colors";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("* Email"),
  password: Yup.string().required().min(6).label("* Password"),
});

class LoginScreen extends React.Component {
  state = {
    fontsLoaded: false,
  };

  static contextType = AuthContext;

  async loadFonts() {
    await Font.loadAsync({
      Aladin: require("../assets/fonts/Aladin-Regular.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
    this.initAsync();
    // const user_data = this.context;
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync();
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user }, () => {
      this.context.setUser(user);
    });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  _signInUserWithCred = (data) => {
    firebase.default
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCred) => {
        // alert("Successfully signed \in");
        console.log(data.email, data.password);
        this.context.setUser(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    /*const fs = firebase.default.firestore()
    fs.collection("users").doc("OVNLtYzp3ZrhpI3dc661").set({
      name: "Ajmal husain eache"
    }).then(() => {
      console.log("Data added successfully")
    })*/

    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <StatusBarScreen>
          <ImageBackground
            style={mainStyleSheet.imageBackground}
            resizeMode="stretch"
            source={require("../assets/backGround.png")}
          >
            <View style={mainStyleSheet.appLogoContainer}>
              <Image
                style={mainStyleSheet.appLogoStyle}
                source={require("../assets/appLogo.png")}
              />
              <Text style={mainStyleSheet.appNameTextView}>TradeBee</Text>
            </View>

            <MyCard style={mainStyleSheet.loginCard}>
              <AppText style={mainStyleSheet.loginLabel}>Login</AppText>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={this._signInUserWithCred}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  setFieldTouched,
                  touched,
                }) => (
                  <>
                    <AppTextInput
                      iconName="email"
                      placeholder="Email"
                      width="100%"
                      onChangeText={handleChange("email")}
                    />
                    {touched.email && <ErrorMessage error={errors.email} />}
                    <AppTextInput
                      iconName="lock"
                      placeholder="Password"
                      width="100%"
                      secureTextEntry={true}
                      onChangeText={handleChange("password")}
                    />
                    {touched.password && (
                      <ErrorMessage error={errors.password} />
                    )}
                    <View>
                      <AppButton
                        style={mainStyleSheet.loginButton}
                        title="LOGIN"
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Formik>

              <Text style={{ fontSize: 20, color: "white" }}>OR</Text>

              <TouchableOpacity
                style={mainStyleSheet.googleSignUpContainer}
                onPress={this.signInAsync}
              >
                <AntDesign style={{ margin: 5 }} name="google" size={25} />
                <Text>Sign Up using Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text style={mainStyleSheet.memberSignUpTextView}>
                  Not a member? Sign Up
                </Text>
              </TouchableOpacity>
            </MyCard>
          </ImageBackground>
        </StatusBarScreen>
      );
    } else {
      return null;
    }
  }
}

const mainStyleSheet = StyleSheet.create({
  appLogoContainer: {
    marginBottom: 13,
    alignItems: "center",
  },

  appLogoStyle: {
    width: 80,
    height: 80,
  },

  loginCard: {
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: colors.secondary,
  },

  loginLabel: {
    textShadowColor: "black",
    fontSize: 30,
    width: "100%",
    alignSelf: "flex-start",
  },

  imageBackground: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },

  memberSignUpTextView: {
    color: "white",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
  },

  googleSignUpContainer: {
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  appNameTextView: {
    fontFamily: "Aladin",
    fontSize: 60,
  },
});

export default LoginScreen;
