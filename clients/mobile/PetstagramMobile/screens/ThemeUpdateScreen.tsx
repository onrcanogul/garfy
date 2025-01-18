import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const ThemeUpdateScreen: React.FC = () => {
  const { theme, setTheme } = useTheme(); // Context'ten tema bilgisi alınıyor

  const handleThemeChange = (theme: "Light" | "Dark" | "System") => {
    setTheme(theme); // Tema değiştiriliyor
    console.log(`Theme updated to: ${theme}`);
  };

  return (
    <View style={styles.container}>
      {/* Bilgilendirme Metni */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Select your preferred theme. You can choose between Light, Dark, or
          System Default (which matches your device settings).
        </Text>
      </View>

      {/* Tema Seçenekleri */}
      <View style={styles.optionsContainer}>
        {/* Light Theme */}
        <TouchableOpacity
          style={[
            styles.option,
            theme === "Light" && styles.lightThemeSelected,
          ]}
          onPress={() => handleThemeChange("Light")}
        >
          <Text
            style={[
              styles.optionText,
              theme === "Light" && styles.lightThemeSelectedText,
            ]}
          >
            Light Theme
          </Text>
        </TouchableOpacity>

        {/* Dark Theme */}
        <TouchableOpacity
          style={[styles.option, theme === "Dark" && styles.darkThemeSelected]}
          onPress={() => handleThemeChange("Dark")}
        >
          <Text
            style={[
              styles.optionText,
              theme === "Dark" && styles.darkThemeSelectedText,
            ]}
          >
            Dark Theme
          </Text>
        </TouchableOpacity>

        {/* System Default */}
        <TouchableOpacity
          style={[
            styles.option,
            theme === "System" && styles.systemThemeSelected,
          ]}
          onPress={() => handleThemeChange("System")}
        >
          <Text
            style={[
              styles.optionText,
              theme === "System" && styles.systemThemeSelectedText,
            ]}
          >
            System Default
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  infoContainer: {
    backgroundColor: "#e7f1ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    color: "#004085",
    fontSize: 14,
    lineHeight: 20,
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  // Light Theme Selected Style
  lightThemeSelected: {
    backgroundColor: "#ffffff",
    borderColor: "#007bff",
  },
  lightThemeSelectedText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  // Dark Theme Selected Style
  darkThemeSelected: {
    backgroundColor: "#333333",
    borderColor: "#000000",
  },
  darkThemeSelectedText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  // System Default Theme Selected Style
  systemThemeSelected: {
    backgroundColor: "#f0f0f0",
    borderColor: "#007bff",
  },
  systemThemeSelectedText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default ThemeUpdateScreen;
