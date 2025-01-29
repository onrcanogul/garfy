import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";

const LanguageUpdateScreen: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: "English" | "Turkish" | "Spanish") => {
    setLanguage(lang);
    console.log(`Language updated to: ${lang}`);
  };

  return (
    <View style={styles.container}>
      {/* Bilgilendirme Metni */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Select your preferred language. The app will update its content based
          on your choice.
        </Text>
      </View>

      {/* Dil Seçenekleri */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            language === "English" && styles.selectedOption,
          ]}
          onPress={() => handleLanguageChange("English")}
        >
          <Text
            style={[
              styles.optionText,
              language === "English" && styles.selectedOptionText,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            language === "Turkish" && styles.selectedOption,
          ]}
          onPress={() => handleLanguageChange("Turkish")}
        >
          <Text
            style={[
              styles.optionText,
              language === "Turkish" && styles.selectedOptionText,
            ]}
          >
            Turkish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            language === "Spanish" && styles.selectedOption,
          ]}
          onPress={() => handleLanguageChange("Spanish")}
        >
          <Text
            style={[
              styles.optionText,
              language === "Spanish" && styles.selectedOptionText,
            ]}
          >
            Spanish
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
  selectedOption: {
    backgroundColor: "#213555",
    borderColor: "#213555",
  },
  selectedOptionText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default LanguageUpdateScreen;
