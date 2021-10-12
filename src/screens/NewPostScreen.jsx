import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StatusBar } from "react-native";
import AddNewPost from "../components/NewPost/AddNewPost";

const NewPostScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: 40,
      }}
    >
      <StatusBar />
      <AddNewPost />
    </SafeAreaView>
  );
};

export default NewPostScreen;
