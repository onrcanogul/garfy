import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileStatsProps {
  posts: number;
  followers: number;
  following: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  posts,
  followers,
  following,
}) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{posts}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{followers}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{following}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProfileStats;
