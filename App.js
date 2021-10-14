import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import AuthNavigation from "./AuthNavigation";
import { RecoilRoot } from "recoil";

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <RecoilRoot>
      <AuthNavigation />
    </RecoilRoot>
  );
};

export default App;
