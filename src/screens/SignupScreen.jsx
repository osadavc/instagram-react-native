import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import SignupForm from "../components/SignupScreen/SignupForm";

const SignupScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/instagram-black.png")}
            style={{ height: 80, resizeMode: "center" }}
          />
        </View>
        <SignupForm />
      </View>
    </TouchableWithoutFeedback>
  );
};

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

export default SignupScreen;
