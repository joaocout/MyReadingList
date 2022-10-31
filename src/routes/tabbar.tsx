import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Shelf from "../pages/Shelf";
import Catalog from "../pages/Catalog";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bookshelf" component={Shelf} />
      <Tab.Screen name="Catalog" component={Catalog} />
    </Tab.Navigator>
  );
}
