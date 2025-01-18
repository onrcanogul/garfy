import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SettingItem from "../components/settings/SettingItem";
import SettingSection from "../components/settings/SettingSection";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <SettingSection title="Account">
        <SettingItem
          title="Change Password"
          iconName="lock-closed-outline"
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <SettingItem
          title="Logout"
          iconName="log-out-outline"
          onPress={() => console.log("Logout")}
        />
      </SettingSection>
      {/* Uygulama Ayarları */}
      <SettingSection title="Application">
        <SettingItem
          title="Theme"
          iconName="color-palette-outline"
          onPress={() => {
            navigation.navigate("ThemeUpdate");
          }}
        />
        <SettingItem
          title="Language"
          iconName="globe-outline"
          onPress={() => navigation.navigate("LanguageUpdate")} // Yönlendirme
        />
      </SettingSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
});

export default SettingsScreen;
