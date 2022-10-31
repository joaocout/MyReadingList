import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../shared/constants";

import Shelf from "../pages/Shelf";
import Catalog from "../pages/Catalog";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={route.name === "Catalog" ? "search" : "md-list"}
            size={22}
            color={focused ? COLORS.ACCENT : COLORS.LIGHTGRAY}
          />
        ),
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Bookshelf" component={Shelf} />
      <Tab.Screen name="Catalog" component={Catalog} />
    </Tab.Navigator>
  );
}
