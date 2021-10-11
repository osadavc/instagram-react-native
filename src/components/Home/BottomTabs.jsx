import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Divider } from "react-native-elements";

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
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
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
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
