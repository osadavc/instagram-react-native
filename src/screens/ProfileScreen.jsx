import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import SkeletonContent from "react-native-skeleton-content";

import Header from "../components/ProfileScreen/Header";
import Post from "../components/Home/Post";

import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";
import UserData from "../components/ProfileScreen/UserData";
import { Divider } from "react-native-elements";
import { db } from "../../firebase";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = () => {
  const currentUser = useRecoilValue(authState);

  const [isLoading, toggleLoading] = useState(true);
  const [posts, setPosts] = useState([{}, {}]);

  const profilePostRef = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("posts");

  useEffect(() => {
    const unsubscribe = profilePostRef
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

  const deletePost = (postId) => {
    profilePostRef.doc(postId).delete();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StatusBar />
      <ScrollView style={{ flex: 1, marginBottom: 50 }}>
        <UserData />
        <Divider
          style={{ marginTop: 30 }}
          orientation="vertical"
          insetType="middle"
          color="#eee"
        />
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
            <Post
              key={index}
              post={post}
              deleteFunction={() => deletePost(post.id)}
            />
          </SkeletonContent>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
  },
});
