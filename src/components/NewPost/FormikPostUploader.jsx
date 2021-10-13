import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Text, Keyboard } from "react-native";
import { Divider, Button as ButtonElement } from "react-native-elements";
import * as Yup from "yup";
import validUrl from "valid-url";

import firebase from "firebase";
import { auth, db } from "../../../firebase";

const PLACEHOLDER_IMAGE =
  "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg";

const FormikPostUploader = () => {
  const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string()
      .url("Image URL Must Be A Valid URL")
      .required("A URL is Required"),
    caption: Yup.string().max(2200, "Caption Has Reached The Character Limit"),
  });

  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = () => {
    const user = auth.currentUser;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((user) => {
        setCurrentLoggedInUser({
          uid: user.data().uid,
          username: user.data().username,
          profile_picture: user.data().profile_picture,
        });
      });
  };

  const submitPost = ({ imageUrl, caption }) => {
    db.collection("users")
      .doc(currentLoggedInUser.uid)
      .collection("posts")
      .add({
        user: currentLoggedInUser.username,
        uid: currentLoggedInUser.uid,
        profile_picture: currentLoggedInUser.profile_picture,
        imageUrl,
        caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => {
        Keyboard.dismiss();
        navigation.goBack();
      });
  };

  return (
    <View>
      <Formik
        initialValues={{ caption: "", imageUrl: "" }}
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
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                margin: 20,
                marginLeft: 0,
                marginTop: 50,
                flexDirection: "row",
              }}
            >
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACEHOLDER_IMAGE,
                }}
                style={{ width: 100, height: 100 }}
              />

              <View style={{ flex: 1, marginLeft: 12 }}>
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

            <Divider orientation="vertical" />
            <TextInput
              placeholder="Enter Image Url"
              placeholderTextColor="gray"
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              style={{ color: "white", fontSize: 16, marginTop: 10 }}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ fontSize: 12, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}

            <View style={{ marginTop: 20 }}>
              <ButtonElement
                onPress={handleSubmit}
                title="Share"
                disabled={!(isValid && dirty)}
                type="outline"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormikPostUploader;
