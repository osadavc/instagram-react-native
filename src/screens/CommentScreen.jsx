import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";

import Comment from "../components/CommentScreen/Comment";
import { Header } from "../components/NewPost/AddNewPost";

const CommentScreen = () => {
  const route = useRoute();
  const currentUser = useRecoilValue(authState);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const commentRef = db
    .collection("users")
    .doc(route.params.postOwnerUid)
    .collection("posts")
    .doc(route.params.postId)
    .collection("comments");

  useEffect(() => {
    commentRef.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const commentList = [];
      snapshot.docs.forEach((doc) => {
        commentList.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentList);
    });
  }, [route]);

  const addComment = () => {
    if (commentInput != "") {
      commentRef
        .add({
          comment: commentInput,
          username: currentUser.username,
          uid: currentUser.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Keyboard.dismiss();
          setCommentInput("");
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 15 }}>
          <Header
            text={`Comments to the post from ${route?.params?.postOwner}`}
            smallText
          />
          <ScrollView>
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            {comments?.length === 0 && (
              <Text style={styles.noComments}>No comments found</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: currentUser.profilePicture,
                height: 35,
                width: 35,
              }}
              style={{ borderRadius: 25, marginRight: 15 }}
            />
            <TextInput
              value={commentInput}
              onChangeText={(comment) => setCommentInput(comment)}
              style={styles.commentInput}
              placeholder={`Comment as ${currentUser.username}`}
              placeholderTextColor="#eee"
              multiline
            />
          </View>
          {commentInput != "" && (
            <TouchableOpacity
              onPress={addComment}
              style={{ position: "absolute", right: 1 }}
            >
              <MaterialIcons name="send" color="#fff" size={27} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
  },
  noComments: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 60,
    zIndex: 100,
    width: "95%",
    paddingHorizontal: 20,
  },
  commentInput: {
    height: 40,
    fontSize: 17,
    width: "77%",
    color: "white",
  },
});

export default CommentScreen;
