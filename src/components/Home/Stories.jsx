import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import storiesData from "../../data/stories";

const Stories = () => {
  return (
    <View style={{ marginBottom: 15, marginTop: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {storiesData.map((story, index) => (
          <TouchableOpacity key={index}>
            <View style={{ alignItems: "center" }}>
              <Image source={{ uri: story.image }} style={styles.story} />
              <Text style={{ color: "white" }}>
                {story.user.length > 10
                  ? story.user.slice(0, 10).toLowerCase() + "..."
                  : story.user}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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

export default Stories;
