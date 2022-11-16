import React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";

import store from "./redux/store";
import Tabs from "./routes/tabbar";

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootSiblingParent>
          <Tabs />
          <StatusBar style="auto" />
        </RootSiblingParent>
      </NavigationContainer>
    </Provider>
  );
}
