import React, { useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/Header";
import Ionicons from "react-native-vector-icons/Ionicons"; // For icons
import PostList from "./components/PostList";

const Tab = createBottomTabNavigator();

const SocialMediaScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <PostList />
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Settings Screen</Text>
  </View>
);

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
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = "";

              if (route.name === "Social Media") {
                iconName = focused ? "home" : "home-outline";
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
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
