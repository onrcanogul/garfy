import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import ThemeUpdateScreen from "../screens/settings/ThemeUpdateScreen";
import LanguageUpdateScreen from "../screens/settings/ThemeUpdateScreen";

const Stack = createNativeStackNavigator();

const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* Settings ana ekranı */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: "Settings", headerShown: false }}
      />

      {/* Şifre Değiştirme ekranı */}
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      {/* Tema Güncelleme ekranı */}
      <Stack.Screen
        name="ThemeUpdate"
        component={ThemeUpdateScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="LanguageUpdate"
        component={LanguageUpdateScreen} // Yeni ekran burada tanımlandı
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
