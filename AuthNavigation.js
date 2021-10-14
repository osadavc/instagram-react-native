import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { auth, db } from "./firebase";
import { SignedInStack, SignedOutStack } from "./navigation";

import { useRecoilState } from "recoil";
import { authState } from "./src/atoms/authAtom";

const AuthNavigation = () => {
  const [isLoading, toggleLoading] = useState(true);
  const [currentUser, setCurrentUser] = useRecoilState(authState);

  useEffect(() => {
    toggleLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            setCurrentUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            });
            toggleLoading(false);
          });
      } else {
        setCurrentUser(null);
        toggleLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={55} color="#B33392" />
      </View>
    );
  } else {
    if (currentUser) {
      return <SignedInStack />;
    } else {
      return <SignedOutStack />;
    }
  }
};

export default AuthNavigation;
