import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SettingItemProps {
  title: string;
  iconName: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  iconName,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={24} color="#000" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
});

export default SettingItem;
