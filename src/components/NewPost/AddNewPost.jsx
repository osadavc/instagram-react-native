import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header text="Add New Post" />
      <FormikPostUploader />
    </View>
  );
};

export const Header = ({ text, smallText }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
          style={{ height: 28, width: 28 }}
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, { fontSize: smallText && 17 }]}>
        {text}
      </Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 19.5,
    marginRight: 15,
  },
});

export default AddNewPost;
