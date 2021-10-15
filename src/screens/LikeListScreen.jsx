import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Header } from "../components/NewPost/AddNewPost";

import Constants from "expo-constants";
import Like from "../components/LikeListScreen/Like";

const LikeListScreen = () => {
  const route = useRoute();

  console.log(route.params.postLikes);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15, marginBottom: 30 }}>
        <Header text={`Likes to the post by ${route.params.postOwner}`} />
      </View>

      {route.params.postLikes?.map((user) => (
        <Like key={user} uid={user} />
      ))}
    </View>
  );
};

export default LikeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
  },
});
