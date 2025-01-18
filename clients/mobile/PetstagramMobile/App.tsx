import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/layout/Header";
import TabNavigator from "./navigators/TabNavigator";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

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
    <LanguageProvider>
      <ThemeProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Header
              selectedValue={selectedValue}
              onMenuPress={handleMenuPress}
              onSelectPress={handleSelectPress}
            />
            <TabNavigator />
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
