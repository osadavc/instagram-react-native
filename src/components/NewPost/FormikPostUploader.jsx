import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Keyboard,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Button as ButtonElement } from "react-native-elements";
import * as Yup from "yup";
import validUrl from "valid-url";

import AntDesign from "react-native-vector-icons/AntDesign";

import firebase from "firebase";
import { storage, db } from "../../../firebase";
import { authState } from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";

import * as ImagePicker from "expo-image-picker";

const PLACEHOLDER_IMAGE =
  "https://www.schemecolor.com/images/color-image-thumb.php?tx&w=1200&h=1200&hex=727272";

const FormikPostUploader = () => {
  const uploadPostSchema = Yup.object().shape({
    caption: Yup.string().max(2200, "Caption Has Reached The Character Limit"),
  });

  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const currentUser = useRecoilValue(authState);

  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setThumbnailUrl(result.uri);
    }
  };

  const submitPost = async ({ caption }) => {
    toggleLoading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", thumbnailUrl, true);
      xhr.send(null);
    });

    const ref = storage
      .ref()
      .child(
        `${currentUser.uid} ${currentUser.username} ${new Date().toISOString()}`
      );
    const snapshot = await ref.put(blob);
    blob.close();

    db.collection("users")
      .doc(currentUser.uid)
      .collection("posts")
      .add({
        user: currentUser.username,
        uid: currentUser.uid,
        imageUrl: await snapshot.ref.getDownloadURL(),
        caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => {
        Keyboard.dismiss();
        toggleLoading(false);
        navigation.goBack();
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need access to photos and media on your device"
          );
        }
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Formik
          initialValues={{ caption: "" }}
          onSubmit={(values) => submitPost(values)}
          validationSchema={uploadPostSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            dirty,
          }) => (
            <View style={{ marginHorizontal: 5, marginRight: 5 }}>
              <View
                style={{
                  marginTop: 50,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: thumbnailUrl ? 10 : 0,
                  }}
                >
                  <Image
                    source={{
                      uri: validUrl.isUri(thumbnailUrl)
                        ? thumbnailUrl
                        : PLACEHOLDER_IMAGE,
                    }}
                    style={{ width: "100%", height: 320, borderRadius: 10 }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!!thumbnailUrl || (
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                        onPress={pickImage}
                      >
                        <AntDesign name="plus" color="#000" size={65} />
                        <Text
                          style={{
                            fontSize: 18,
                            textAlign: "center",
                            marginTop: 8,
                          }}
                        >
                          Upload Image
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {thumbnailUrl && (
                  <ButtonElement
                    onPress={() => setThumbnailUrl(null)}
                    title="Clear"
                    type="outline"
                    buttonStyle={{
                      width: 100,
                      alignSelf: "flex-end",
                    }}
                  />
                )}

                <View style={{ marginTop: 15 }}>
                  <TextInput
                    placeholder="Write A Caption"
                    placeholderTextColor="gray"
                    multiline
                    style={{ color: "white", fontSize: 18 }}
                    onChangeText={handleChange("caption")}
                    onBlur={handleBlur("caption")}
                    value={values.caption}
                  />
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <ButtonElement
                  onPress={handleSubmit}
                  loading={isLoading}
                  title="Post"
                  disabled={!(isValid && dirty && !!thumbnailUrl)}
                  type="outline"
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormikPostUploader;
