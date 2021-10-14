import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Button as ButtonElement } from "react-native-elements";

import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";
import { db, storage } from "../../../firebase";

const UserData = () => {
  const [isLoading, toggleLoading] = useState(false);
  const currentUser = useRecoilValue(authState);

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

  const changeProfilePicture = async () => {
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
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
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = storage
        .ref("/profilePictures")
        .child(
          `${currentUser.uid} ${
            currentUser.username
          } ${new Date().toISOString()}`
        );
      const snapshot = await ref.put(blob);
      blob.close();

      db.collection("users")
        .doc(currentUser.uid)
        .update({
          profile_picture: await snapshot.ref.getDownloadURL(),
        })
        .then(() => {
          toggleLoading(false);
        });
    }
  };

  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <TouchableOpacity>
        <Image
          source={{
            uri: currentUser.profilePicture,
            width: 100,
            height: 100,
          }}
          style={{ borderRadius: 50 }}
        />
      </TouchableOpacity>
      <Text style={{ color: "#fff", fontSize: 22, marginTop: 10 }}>
        {currentUser.username}
      </Text>
      <Text style={{ color: "#fff", fontSize: 18 }}>{currentUser.email}</Text>

      <View style={{ marginTop: 20 }}>
        <ButtonElement
          title="Change Profile Picture"
          type="outline"
          onPress={changeProfilePicture}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default UserData;
