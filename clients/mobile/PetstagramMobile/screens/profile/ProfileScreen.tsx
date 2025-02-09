import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import PostList from "../../components/profile/ProfilePostList";
import { getProfile } from "../../services/profile/profile-service";
import { currentUser } from "../../services/auth-service";
import Profile from "../../contracts/profile/profile";
import ProfileHeaderScreen from "./ProfileHeaderScreen";

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = React.useState<Profile | null>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedTab, setSelectedTab] = React.useState("Posts");
  useEffect(() => {
    console.log("useffect run");
    fetch();
  }, []);
  const fetch = async () => {
    setLoading(true);
    getProfile(
      currentUser().username,
      (data) => {
        console.log("data");
        console.log(data);
        setProfile(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };
  // Mevcut sekmeyi takip eder

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
  // Eğer yükleniyorsa, yükleme göstergesi göster
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={
        <ProfileHeaderScreen
          profile={profile}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          postCount={posts.length}
        />
      }
      data={[]}
      renderItem={null}
      ListFooterComponent={renderContent()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
