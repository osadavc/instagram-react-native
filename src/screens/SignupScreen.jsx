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
            source={require("../../assets/instagram.png")}
            style={{ height: 140, width: 140 }}
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
    paddingTop: 50,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignupScreen;
