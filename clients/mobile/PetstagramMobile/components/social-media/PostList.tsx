import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import PostCard from "./PostCard";
import Post from "../../contracts/social-media/post";
import { getPosts } from "../../services/social-media/post-service";
import axios from "axios";

const oldPosts = [
  {
    id: 1,
    username: "petlover123",
    profileImage: "https://picsum.photos/50/50", // Profil resmi
    images: [
      "https://picsum.photos/1000/1000?random=1", // İlk resim
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
      "https://source.unsplash.com/random/1080x1080", // İlk resim
      "https://picsum.photos/300/300?random=6", // İkinci resim
    ],
    likes: 112,
    commentsCount: 8,
  },
];

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);

    getPosts(
      page,
      pageSize,
      (data) => {
        setPosts((prevPosts) => [...prevPosts, data]);
        setPage((prevPage) => prevPage + 1);
      },
      (error) => {}
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={oldPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            username={"oogul"}
            profileImage={item.profileImage}
            images={item.images}
            likes={item.likes}
            commentsCount={item.commentsCount}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
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
