import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import storiesData from "../../data/stories";
import Story from "./Story";

import { db } from "../../../firebase";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    db.collection("users")
      .limit(20)
      .onSnapshot((snapshot) => {
        const storyList = [];
        snapshot.forEach((doc) => {
          storyList.push({ id: doc.id, ...doc.data() });
        });
        setStories(storyList);
      });
  }, []);

  return (
    <View style={{ marginBottom: 15, marginTop: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stories.map((story, index) => (
          <Story key={index} story={story} />
        ))}
        {storiesData.map((story, index) => (
          <Story key={index} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
