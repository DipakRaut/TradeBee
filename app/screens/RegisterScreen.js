// Lord of the Rings

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  CheckBox,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from "react-native";
import AppText from "../components/AppText";

import { Formik } from "formik";

import * as Yup from "yup";

// import ErrorMessage from "./ErrorMessage";
import * as firebase from "firebase";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import ErrorMessage from "../components/ErrorMessage";
// import CheckBox from "@react-native-community/checkbox";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("* Username"),
  email: Yup.string().required().email().label("* Email"),
  password: Yup.string().required().min(4).label("* Passowrd"),
  confirmPassword: Yup.string().required().min(4).label("* ConfirmPassowrd"),
});

function RegisterScreen({ navigation }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // const fs = firebase.default.firestore();
  const register = (value) => {
    firebase.default
      .auth()
      .createUserWithEmailAndPassword(value.email, value.password)

      .then((res) => {
        Alert.alert("Good to go", "Registration is successfull", [
          {
            text: "Goto Login",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
        return res.user.updateProfile({ displayName: value.username });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/backGround.png")}
      resizeMode="stretch"
    >
      <ScrollView>
        <View style={styles.container}>
          <AppText style={styles.tagline}>Be a Crypto trader Today</AppText>
          <TouchableWithoutFeedback style={styles.cc}>
            <View style={styles.card}>
              <AppText style={styles.label}>Register</AppText>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  // this is the function that get called when the form is submitted
                  //here we pass the function this function takes an object that represents the value in the form

                  // onSubmit={(value) => {
                  //   Alert.alert("Good to go", "Registration is successfull", [
                  //     {
                  //       text: "Goto Login",
                  //       onPress: () => console.log(value.email),
                  //     },
                  //   ]);

                  //   register;
                  // }}
                  onSubmit={(value) => {
                    if (value.password !== value.confirmPassword) {
                      alert("Password did not match, Try once Again");
                    } else {
                      console.log(value.password);
                      register(value);
                    }
                  }}
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
                        iconName="account"
                        onBlur={() => setFieldTouched("username")}
                        placeholder="UserName"
                        onChangeText={handleChange("username")}
                      />
                      {touched.username && (
                        <ErrorMessage error={errors.username} />
                      )}
                      <AppTextInput
                        iconName="email"
                        placeholder="Email"
                        onBlur={() => setFieldTouched("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleChange("email")}
                        autoCorrect={false}
                      />
                      {touched.email && <ErrorMessage error={errors.email} />}
                      <AppTextInput
                        iconName="lock"
                        placeholder="Password"
                        autoCapitalize="none"
                        onBlur={() => setFieldTouched("password")}
                        onChangeText={handleChange("password")}
                        secureTextEntry={true}
                      />
                      {touched.password && (
                        <ErrorMessage error={errors.password} />
                      )}
                      <AppTextInput
                        iconName="onepassword"
                        placeholder="Confirm Password"
                        onBlur={() => setFieldTouched("confirmPassword")}
                        autoCapitalize="none"
                        onChangeText={handleChange("confirmPassword")}
                        secureTextEntry={true}
                      />
                      {touched.confirmPassword && (
                        <ErrorMessage error={errors.confirmPassword} />
                      )}

                      <View style={styles.termsContainer}>
                        <CheckBox
                          disabled={false}
                          value={toggleCheckBox}
                          onValueChange={(newValue) =>
                            setToggleCheckBox(newValue)
                          }
                        />

                        <AppText style={styles.terms}>
                          I agree to terms and conditions
                        </AppText>
                      </View>
                      <AppButton title="Sign up" onPress={handleSubmit} />
                      {/* this will cause the form to be submitted */}
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "nowrap",
  },
  tagline: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 50,
    marginRight: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
    // resizeMode: ,
  },
  termsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    marginTop: 9,
  },
  terms: {
    fontSize: 13,
  },
  card: {
    width: "90%",
    height: 530,
    marginTop: 10,
    backgroundColor: "#6D4C41",
    borderRadius: 8,
    alignSelf: "center",
    position: "relative",
    elevation: 5,
  },
  cc: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  label: {
    textShadowColor: "black",
    fontSize: 30,
    padding: 10,
  },
});
