import React, { useState, useEffect } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { db } from "../../../firebase";

const Like = ({ uid }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setUser({ id: doc.id, ...doc.data() });
      });
  }, [uid]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: user?.profile_picture, width: 40, height: 40 }}
        style={{ borderRadius: 40 / 2, marginRight: 10 }}
      />
      <Text style={{ color: "white", fontSize: 17 }}>{user?.username}</Text>
    </TouchableOpacity>
  );
};

export default Like;
