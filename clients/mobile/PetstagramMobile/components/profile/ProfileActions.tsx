import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ProfileActions: React.FC = () => {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Follow</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#213555",
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileActions;
