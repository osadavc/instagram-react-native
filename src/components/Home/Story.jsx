import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const Story = ({ story }) => {
  return (
    <TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: story?.profile_picture }} style={styles.story} />
        <Text
          style={{ color: "white", textAlign: "center", alignSelf: "center" }}
        >
          {story?.username?.length > 8
            ? story.username.slice(0, 8).toLowerCase() + "..."
            : story.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

export default Story;
