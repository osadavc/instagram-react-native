import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import SkeletonContent from "react-native-skeleton-content";

import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import BottomTabs from "../components/Home/BottomTabs";
import bottomTabsData from "../data/bottomTabs";
import { db } from "../../firebase";

const HomeScreen = () => {
  const [posts, setPosts] = useState([{}, {}]);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    toggleLoading(true);
    const unsubscribe = db
      .collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postList = [];
        snapshot.docs.forEach((doc) => {
          postList.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postList);
        toggleLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <SkeletonContent
            key={index}
            containerStyle={{
              justifyContent: "center",
              marginBottom: isLoading ? 30 : 0,
            }}
            isLoading={isLoading}
            animationType="shiver"
            highlightColor="#262626"
            boneColor="#3F3F3F"
            layout={[
              {
                key: "top_container",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                marginTop: 15,
                paddingHorizontal: 15,
                children: [
                  {
                    key: "profile_picture",
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                  },
                  {
                    key: "user_name",
                    width: 130,
                    height: 20,
                    marginLeft: 10,
                  },
                ],
              },
              {
                key: "main_image",
                width: "100%",
                height: 440,
                marginBottom: 6,
                borderRadius: 0,
              },
            ]}
          >
            <Post key={index} post={post} />
          </SkeletonContent>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabsData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50,
  },
});

export default HomeScreen;
