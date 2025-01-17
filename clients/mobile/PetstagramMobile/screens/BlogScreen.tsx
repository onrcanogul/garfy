import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import BlogCard from "../components/blog/BlogCard";

const blogPosts = [
  {
    id: "1",
    title: "Why Pets Are Awesome",
    content: "Pets bring joy to our lives in so many ways!",
    tags: [
      { id: 1, name: "Pets" },
      { id: 2, name: "Happiness" },
    ],
    likes: 120,
    comments: 34,
  },
  {
    id: "2",
    title: "Caring for Your Dog",
    content: "Tips to keep your dog happy and healthy.",
    tags: [
      { id: 3, name: "DogCare" },
      { id: 4, name: "Tips" },
    ],
    likes: 85,
    comments: 12,
  },
  {
    id: "3",
    title: "Top 10 Cat Breeds",
    content: "Discover the most popular cat breeds in the world.",
    tags: [
      { id: 5, name: "Cats" },
      { id: 6, name: "Breeds" },
    ],
    likes: 200,
    comments: 45,
  },
];

const BlogScreen: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState(null); // Seçili gönderiyi tutar

  const renderBlogList = () => (
    <FlatList
      data={blogPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BlogCard
          title={item.title}
          content={item.content}
          tags={item.tags}
          likes={item.likes}
          comments={item.comments}
          onPress={() => {
            console.log(`Selected Post: ${item.title}`); // Tıklanan gönderi
            setSelectedPost(item); // State güncellemesi
          }}
        />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );

  const renderDetailScreen = () => (
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{selectedPost?.title}</Text>
      <Text style={styles.content}>{selectedPost?.content}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedPost(null)}
      >
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedPost ? renderDetailScreen() : renderBlogList()}
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#213555",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#eef2ff",
    padding: 6,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#213555",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "#555",
  },
  backButton: {
    padding: 12,
    backgroundColor: "#213555",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
