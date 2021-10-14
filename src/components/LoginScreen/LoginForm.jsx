import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { Button } from "react-native-elements";

import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../../firebase";

const LoginForm = () => {
  const [isLoading, toggleLoading] = useState(false);
  const navigation = useNavigation();

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
  });

  const onLogin = async (email, password) => {
    Keyboard.dismiss();
    try {
      toggleLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      toggleLoading(false);
      Alert.alert("Error", error.message, [
        { text: "Got It", onPress: () => null, style: "cancel" },
        { text: "Sign Up", onPress: () => navigation.navigate("SignupScreen") },
      ]);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={loginFormSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          dirty,
        }) => (
          <>
            <View style={styles.wrapper}>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length > 0 && errors.email
                        ? "red"
                        : "#C6C6C6",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#8F8F8F"
                  placeholder="Email Address"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.password.length > 0 && errors.password
                        ? "red"
                        : "#C6C6C6",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#8F8F8F"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                marginBottom: 30,
                width: "95%",
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: "#6BB0F5" }}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Login"
              onPress={handleSubmit}
              containerStyle={{ width: "95%", borderRadius: 5 }}
              buttonStyle={{ height: 45 }}
              disabledStyle={{ backgroundColor: "#9ACAF7" }}
              disabledTitleStyle={{ color: "white" }}
              disabled={!(isValid && dirty)}
              loading={isLoading}
            />
            <View style={styles.signupContainer}>
              <Text>Don't have an account ?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0F5", marginLeft: 10 }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    width: "95%",
  },
  inputField: {
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#FAFAFAFA",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#C6C6C6",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
});

export default LoginForm;
