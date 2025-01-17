import React, { useState } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/layout/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import SocialMediaScreen from "./screens/SocialMediaScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BlogScreen from "./screens/BlogScreen";
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Daily");

  const handleMenuPress = () => {
    console.log("Menu button pressed");
  };

  const handleSelectPress = () => {
    console.log("Select button pressed");
    if (selectedValue === "Daily") setSelectedValue("Post");
    else setSelectedValue("Daily");
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header
          selectedValue={selectedValue}
          onMenuPress={handleMenuPress}
          onSelectPress={handleSelectPress}
        />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Sekme başlıklarını gizle
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
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
