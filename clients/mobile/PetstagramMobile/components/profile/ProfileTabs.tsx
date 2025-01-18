import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  const tabs = ["Posts", "Likes", "Saved"];
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.selectedTab]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileTabs;
