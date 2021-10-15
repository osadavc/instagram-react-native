import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import DoubleTapHeart from "../../components/Home/DoubleTapHeart";

import firebase from "firebase";
import { db } from "../../../firebase";

import { authState } from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";
import { useNavigation } from "@react-navigation/native";

const postFooterIcons = [
  {
    name: "Like",
    imageSource: require("../../../assets/post-icons/heart.png"),
    likedImageUrl: require("../../../assets/post-icons/heart-filled.png"),
  },
  {
    name: "Comment",
    imageSource: require("../../../assets/post-icons/comment.png"),
  },
  {
    name: "Share",
    imageSource: require("../../../assets/post-icons/share.png"),
  },
  {
    name: "Save",
    imageSource: require("../../../assets/post-icons/save.png"),
  },
];

const USER_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const Post = ({ post, deleteFunction }) => {
  const [isLiked, toggleLikes] = useState(false);
  const [profilePicture, setProfilePicture] = useState(USER_PLACEHOLDER);

  const currentUser = useRecoilValue(authState);

  useEffect(() => {
    toggleLikes(post?.likes_by_users?.includes(currentUser.uid));

    const unsubscribe = db
      .collection("users")
      .doc(post.uid)
      .onSnapshot((doc) => {
        setProfilePicture(doc.data().profile_picture);
      });

    return () => unsubscribe();
  }, [post]);

  const handleLike = () => {
    db.collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: !isLiked
          ? firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
          : firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
      });
  };

  const handleDoubleTapLike = () => {
    db.collection("users")
      .doc(post.uid)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: firebase.firestore.FieldValue.arrayUnion(
          currentUser.uid
        ),
      });
  };

  return (
    <View style={{ marginBottom: 14 }}>
      <PostHeader
        post={post}
        profilePicture={profilePicture}
        deleteFunction={deleteFunction}
      />
      <PostImage post={post} handleDoubleTapLike={handleDoubleTapLike} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} isLiked={isLiked} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post, profilePicture, deleteFunction }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      marginTop: 15,
      alignItems: "center",
    }}
  >
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
    >
      <Image
        source={{ uri: profilePicture ? profilePicture : USER_PLACEHOLDER }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
          marginLeft: 10,
          borderWidth: 1.6,
          borderColor: "#ff8501",
        }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          marginLeft: 10,
          fontSize: 14.5,
        }}
      >
        {post?.user}
      </Text>
    </View>

    {!!deleteFunction ? (
      <TouchableOpacity onPress={deleteFunction}>
        <AntDesign
          name="delete"
          color="#fff"
          size={23}
          style={{ marginBottom: 12, paddingRight: 5 }}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginTop: -16,
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          ...
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const PostImage = ({ post, handleDoubleTapLike }) => (
  <DoubleTapHeart
    icon
    delay={300}
    timeout={1000}
    doubleClick={handleDoubleTapLike}
  >
    <View style={{ width: "100%", height: 450 }}>
      <Image
        source={{ uri: post?.imageUrl }}
        style={{ height: "100%", resizeMode: "cover" }}
      />
    </View>
  </DoubleTapHeart>
);

const PostFooter = ({ handleLike, isLiked, post }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={styles.footerIcon}
            source={
              isLiked
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageSource
            }
          />
        </TouchableOpacity>
        <Icon
          imageSource={postFooterIcons[1].imageSource}
          imageStyle={[styles.footerIcon, { width: 22, height: 22 }]}
          onPress={() => {
            navigation.navigate("CommentScreen", {
              postOwner: post.user,
              postOwnerUid: post.uid,
              postId: post.id,
            });
          }}
        />
        <Icon
          imageSource={postFooterIcons[2].imageSource}
          imageStyle={styles.footerIcon}
        />
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon
          imageStyle={styles.footerIcon}
          imageSource={postFooterIcons[3].imageSource}
        />
      </View>
    </View>
  );
};

const Icon = ({ imageStyle, imageSource, onPress }) => (
  <TouchableOpacity onPress={onPress ? onPress : () => {}}>
    <Image style={imageStyle} source={imageSource} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 8 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post?.likes_by_users?.length.toLocaleString("en")}{" "}
      {post?.likes_by_users.length > 1 || post?.likes_by_users.length == 0
        ? "Likes"
        : "Like"}
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "700" }}>{post.user}</Text>
      <Text>
        {"  "}
        {""}
        {post.caption}
      </Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post?.comments?.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length} {""}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post?.comments?.slice(0, 2)?.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 3 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user} </Text>
          {comment.comment.length > 80
            ? comment.comment.slice(0, 80) + "..."
            : comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  footerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "28%",
    justifyContent: "space-between",
  },
});

export default Post;
