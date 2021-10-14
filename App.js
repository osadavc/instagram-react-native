import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import AuthNavigation from "./AuthNavigation";
import { RecoilRoot } from "recoil";

const App = () => {
  LogBox.ignoreLogs([`Setting a timer for a long period`]);
  return (
    <RecoilRoot>
      <AuthNavigation />
    </RecoilRoot>
  );
};

export default App;
