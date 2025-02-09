import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileHeader from "../../components/profile/ProfileHeader";

const ProfileHeaderScreen = ({
  profile,
  selectedTab,
  setSelectedTab,
  postCount,
}) => {
  return (
    <View style={styles.profileHeader}>
      <ProfileHeader
        username={profile.username}
        profilePicture={
          profile?.avatarPath === ""
            ? profile.avatarPath
            : "https://picsum.photos/100/150"
        }
      />
      <ProfileStats
        posts={postCount ?? 0}
        followers={profile.followers.length ?? 0}
        following={profile.following.length ?? 0}
      />
      <ProfileActions />
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab("Posts")}>
          <Icon
            name="grid" // Posts ikon
            size={24}
            style={[
              styles.tabIcon,
              selectedTab === "Posts" && styles.activeTabIcon,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Likes")}>
          <Icon
            name="heart-outline" // Likes ikon
            size={24}
            style={[
              styles.tabIcon,
              selectedTab === "Likes" && styles.activeTabIcon,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Saved")}>
          <Icon
            name="bookmark-outline" // Saved ikon
            size={24}
            style={[
              styles.tabIcon,
              selectedTab === "Saved" && styles.activeTabIcon,
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  profileHeader: {
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  tab: {
    fontSize: 16,
    color: "#666",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#007bff",
  },
  tabIcon: {
    color: "#666", // Varsayılan ikon rengi
  },
  activeTabIcon: {
    color: "#213555", // Aktif sekme rengi
  },
});

export default ProfileHeaderScreen;
