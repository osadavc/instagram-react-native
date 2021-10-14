import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";
import { auth } from "../../../firebase";

const Header = () => {
  const navigation = useNavigation();
  const currentUser = useRecoilValue(authState);

  const SignOut = () => {
    auth.signOut();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 10,
      }}
    >
      <Text style={styles.username}>{currentUser.username}</Text>
      <TouchableOpacity style={{ flexGrow: 1 }}>
        <Feather
          name="chevron-down"
          color="#fff"
          size={23}
          style={{ marginTop: 3 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("NewPostScreen")}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={SignOut}>
        <MaterialIcons
          name="logout"
          color="#fff"
          size={28}
          style={{ marginLeft: 7 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
    paddingHorizontal: 20,
  },
  username: {
    color: "#fff",
    fontSize: 22,
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
});

export default Header;
