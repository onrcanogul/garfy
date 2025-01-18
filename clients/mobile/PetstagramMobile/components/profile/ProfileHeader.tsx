import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProfileHeaderProps {
  username: string;
  profilePicture: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  profilePicture,
}) => {
  return (
    <View style={styles.header}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfileHeader;
