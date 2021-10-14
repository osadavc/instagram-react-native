import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AddNewPost from "../components/NewPost/AddNewPost";

const NewPostScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
    </TouchableWithoutFeedback>
  );
};

export default NewPostScreen;
