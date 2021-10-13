import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import BottomTabs from "../components/Home/BottomTabs";
import bottomTabsData from "../data/bottomTabs";
import { db } from "../../firebase";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postList = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          postList.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postList);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
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
