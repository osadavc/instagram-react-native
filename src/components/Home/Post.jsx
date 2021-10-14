import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";

import firebase from "firebase";
import { db } from "../../../firebase";

import { authState } from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";

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

const Post = ({ post }) => {
  const [isLiked, toggleLikes] = useState(false);
  const currentUser = useRecoilValue(authState);

  useEffect(() => {
    toggleLikes(post?.likes_by_users?.includes(currentUser.uid));
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
      })
      .then();
  };

  return (
    <View style={{ marginBottom: 14 }}>
      <PostHeader post={post} />
      <PostImage post={post} />
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

const PostHeader = ({ post }) => (
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
        source={{ uri: post?.profile_picture }}
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
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post?.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post, isLiked }) => (
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

const Icon = ({ imageStyle, imageSource }) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={imageSource} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 8 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post?.likes_by_users?.length.toLocaleString("en")} Likes
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
    {post?.comments?.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 3 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user} </Text>
          {comment.comment}
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
