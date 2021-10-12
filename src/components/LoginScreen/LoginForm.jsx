import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("The Email Is Not Valid")
      .required("An Email is Required"),
    password: Yup.string()
      .required("An Password is Required")
      .min(8, "Your Password has to have at least 8 characters"),
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
                  placeholder="Phone Number, Username or Email"
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
            />
            <View style={styles.signupContainer}>
              <Text>Don't have an account ?</Text>
              <TouchableOpacity>
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
