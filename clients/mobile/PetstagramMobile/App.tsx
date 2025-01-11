import React, { useState } from "react";
import { View } from "react-native";
import Header from "./components/Header";

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Daily");

  const handleMenuPress = () => {
    console.log("Menu button pressed");
  };

  const handleSelectPress = () => {
    // Logic to open a selection menu or modal
    console.log("Select button pressed");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        selectedValue={selectedValue}
        onMenuPress={handleMenuPress}
        onSelectPress={handleSelectPress}
      />
      {/* Other content */}
    </View>
  );
};

export default App;
