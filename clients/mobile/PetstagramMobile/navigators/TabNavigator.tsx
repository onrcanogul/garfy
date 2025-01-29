import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SocialMediaScreen from "../screens/social-media/SocialMediaScreen";
import BlogScreen from "../screens/blog/BlogScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsStack from "./SettingsStack"; // SettingsStack ekliyoruz

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Social Media") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Blog") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#213555",
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarStyle: { backgroundColor: "#ffffff" },
      })}
    >
      <Tab.Screen name="Social Media" component={SocialMediaScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
