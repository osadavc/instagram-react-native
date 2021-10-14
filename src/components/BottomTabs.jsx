import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";

import bottomTabsData from "../data/bottomTabs";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const currentUser = useRecoilValue(authState);

  const navigation = useNavigation();

  const Icon = ({ icon, onPress }) => (
    <TouchableOpacity
      onPress={() => {
        setActiveTab(icon.name);
        if (!!onPress) {
          onPress();
        }
      }}
    >
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" && styles.profilePic(activeTab),
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" color="#eee" />
      <View style={styles.container}>
        <Icon
          icon={{
            name: "Home",
            active:
              "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
            inactive:
              "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
          }}
          onPress={() => {
            navigation.navigate("HomeScreen");
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          }}
        />
        {bottomTabsData.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
        <Icon
          icon={{
            name: "Profile",
            active: currentUser.profilePicture,
            inactive: currentUser.profilePicture,
          }}
          onPress={() => {
            navigation.navigate("ProfileScreen");
            navigation.reset({
              index: 0,
              routes: [{ name: "ProfileScreen" }],
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "Home") => ({
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: activeTab === "Profile" ? 2 : 0,
  }),
});

export default BottomTabs;
