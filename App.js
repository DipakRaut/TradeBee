import React, { useState } from "react";
import MainNavigation from "./app/Navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import UserAuth from "./app/Navigation/UserAuth";
import AuthContext from "./app/auth/context";

const firebaseConfig = {
  apiKey: "AIzaSyBKWrPDY91TETHzJ-XdEaTV2DZ0EpeBJCg",
  authDomain: "tradebee-46f89.firebaseapp.com",
  projectId: "tradebee-46f89",
  storageBucket: "tradebee-46f89.appspot.com",
  messagingSenderId: "1098929057753",
  appId: "1:1098929057753:web:7d1e0264afe77d39ca73c8",
  measurementId: "G-DBPK74BGCP",
};

export default function App() {
  // firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <MainNavigation /> : <UserAuth />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
