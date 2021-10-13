import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { auth } from "./firebase";
import { SignedInStack, SignedOutStack } from "./navigation";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    toggleLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      toggleLoading(false);
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
