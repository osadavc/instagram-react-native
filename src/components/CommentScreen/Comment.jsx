import React, { useEffect, useState } from "react";

import { View, Text, Image } from "react-native";
import { db } from "../../../firebase";

const USER_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const Comment = ({ comment }) => {
  const [profilePicture, setProfilePicture] = useState(USER_PLACEHOLDER);

  useEffect(() => {
    db.collection("users")
      .doc(comment.uid)
      .get()
      .then((doc) => {
        setProfilePicture(doc.data().profile_picture);
      });
  }, [comment]);

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 15,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: profilePicture ? profilePicture : USER_PLACEHOLDER,
          height: 40,
          width: 40,
        }}
        style={{ borderRadius: 40 / 2 }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {comment.username}
        </Text>
        <Text style={{ color: "white" }}>{comment.comment}</Text>
      </View>
    </View>
  );
};

export default Comment;
