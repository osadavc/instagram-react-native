import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import postData from "../data/posts";
import BottomTabs from "../components/Home/BottomTabs";
import bottomTabsData from "../data/bottomTabs";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Stories />
      <ScrollView>
        {postData.map((post, index) => (
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
  },
});

export default HomeScreen;
