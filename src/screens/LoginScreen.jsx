import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import LoginForm from "../components/LoginScreen/LoginForm";

const LoginScreen = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/instagram-black.png")}
              style={{ height: 80, resizeMode: "center" }}
            />
          </View>
          <LoginForm />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "white",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
});
