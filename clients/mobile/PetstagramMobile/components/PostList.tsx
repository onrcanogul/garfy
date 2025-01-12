// PostList.tsx
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    username: "petlover123",
    profileImage: "https://picsum.photos/50/50", // Profil resmi
    images: [
      "https://picsum.photos/300/300?random=1", // İlk resim
      "https://picsum.photos/300/300?random=2", // İkinci resim
      "https://picsum.photos/300/300?random=3", // Üçüncü resim
    ],
    likes: 245,
    commentsCount: 12,
  },
  {
    id: 2,
    username: "doglover456",
    profileImage: "https://picsum.photos/50/50?random=4", // Profil resmi
    images: [
      "https://picsum.photos/300/300?random=5", // İlk resim
      "https://picsum.photos/300/300?random=6", // İkinci resim
    ],
    likes: 112,
    commentsCount: 8,
  },
];

const PostList: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            username={item.username}
            profileImage={item.profileImage}
            images={item.images}
            likes={item.likes}
            commentsCount={item.commentsCount}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});

export default PostList;
