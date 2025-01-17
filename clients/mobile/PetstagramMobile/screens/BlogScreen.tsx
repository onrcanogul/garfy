import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import BlogCard from "../components/blog/BlogCard";
import DetailScreen from "./BlogDetailScreen";
import BlogList from "../components/blog/BlogList";

// Rastgele kullanıcı ve yorum oluşturmak için yardımcı fonksiyonlar
const getRandomName = () => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie White",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomAvatar = () => {
  const ids = Array.from({ length: 10 }, (_, i) => i + 1);
  const gender = Math.random() > 0.5 ? "men" : "women";
  const id = ids[Math.floor(Math.random() * ids.length)];
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const getRandomComment = () => {
  const comments = [
    "Great post!",
    "Loved the content, very informative.",
    "Thanks for sharing!",
    "This is exactly what I needed.",
    "Super helpful, appreciate it!",
    "Amazing tips, keep up the good work!",
    "Can't believe I didn't know this!",
    "Great insights, very inspiring.",
    "This changed my perspective!",
    "Highly recommended reading.",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
};

const getRandomTimestamp = () => {
  const hours = Math.floor(Math.random() * 24) + 1;
  return `${hours} hours ago`;
};

const generateComments = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    user: {
      name: getRandomName(),
      avatar: getRandomAvatar(),
    },
    text: getRandomComment(),
    timestamp: getRandomTimestamp(),
    likes: Math.floor(Math.random() * 100),
  }));
};

// Blog postlarını oluşturma
const blogPosts = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Blog Post ${i + 1}`,
  content: `This is the content of blog post ${
    i + 1
  }. It's full of valuable information.`,
  tags: [
    { id: 1, name: "Tech" },
    { id: 2, name: "Life" },
    { id: 3, name: "Health" },
    { id: 4, name: "Fitness" },
    { id: 5, name: "Travel" },
  ],
  likes: Math.floor(Math.random() * 500),
  comments: 100,
  images: [
    "https://picsum.photos/200/300",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/250",
  ],
  commentsList: generateComments(100),
}));

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
      {selectedPost ? (
        <DetailScreen
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <BlogList posts={blogPosts} onSelectPost={setSelectedPost} />
      )}
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
