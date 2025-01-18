import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileActions from "../components/profile/ProfileActions";
import PostList from "../components/profile/ProfilePostList";

const ProfileScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("Posts"); // Mevcut sekmeyi takip eder

  const posts = [
    { id: 1, image: "https://picsum.photos/130/150" },
    { id: 2, image: "https://picsum.photos/140/150" },
    { id: 3, image: "https://picsum.photos/180/150" },
    { id: 4, image: "https://picsum.photos/195/150" },
  ];

  const likes = [
    { id: 1, image: "https://picsum.photos/110/150" },
    { id: 2, image: "https://picsum.photos/120/150" },
  ];

  const saved = [{ id: 1, image: "https://picsum.photos/150/150" }];

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return <PostList posts={posts} />;
      case "Likes":
        return <PostList posts={likes} />;
      case "Saved":
        return <PostList posts={saved} />;
      default:
        return null;
    }
  };

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      <ProfileHeader
        username="JohnDoe"
        profilePicture="https://picsum.photos/100/150"
      />
      <ProfileStats posts={34} followers={1200} following={300} />
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

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={[]}
      renderItem={null} // İçerik aşağıdaki renderContent ile kontrol ediliyor
      ListFooterComponent={renderContent()} // Dinamik içerik gösterimi
      contentContainerStyle={styles.container}
    />
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

export default ProfileScreen;
