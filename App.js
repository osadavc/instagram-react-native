import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import AuthNavigation from "./AuthNavigation";

const App = () => {
  LogBox.ignoreAllLogs();
  return <AuthNavigation />;
};

export default App;
