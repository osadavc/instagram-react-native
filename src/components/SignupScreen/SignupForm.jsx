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

import { auth, db } from "../../../firebase";

const SignupForm = () => {
  const [isLoading, toggleLoading] = useState(false);
  const navigation = useNavigation();

  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string().required().min(3).max(12),
    password: Yup.string().required().min(8),
  });

  const onSignup = async (email, username, password) => {
    Keyboard.dismiss();
    try {
      toggleLoading(true);
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      db.collection("users")
        .doc(authUser.user.uid)
        .set({
          uid: authUser.user.uid,
          email: authUser.user.email,
          username,
          profile_picture: `https://ui-avatars.com/api/?name=${username}&background=${getRandomColour()}&size=512`,
        });
    } catch (error) {
      Alert.alert("Error", error.message);
      toggleLoading(false);
    }
  };

  const getRandomColour = () => {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) =>
          onSignup(values.email, values.username, values.password)
        }
        validationSchema={signupFormSchema}
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
                      values.username.length > 0 && errors.username
                        ? "red"
                        : "#C6C6C6",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#8F8F8F"
                  placeholder="Username"
                  autoCapitalize="none"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
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

            <Button
              title="Sign Up"
              onPress={handleSubmit}
              containerStyle={{ width: "95%", borderRadius: 5 }}
              buttonStyle={{ height: 45 }}
              disabledStyle={{ backgroundColor: "#9ACAF7" }}
              disabledTitleStyle={{ color: "white" }}
              disabled={!(isValid && dirty)}
              loading={isLoading}
            />
            <View style={styles.signupContainer}>
              <Text>Already have an account ?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6BB0F5", marginLeft: 10 }}>Log In</Text>
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

export default SignupForm;
