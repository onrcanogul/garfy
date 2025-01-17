import React from "react";
import { FlatList, TextInput, StyleSheet } from "react-native";
import BlogCard from "./BlogCard";

const BlogList = ({ posts, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = React.useState(""); // Arama sorgusu
  const [filteredPosts, setFilteredPosts] = React.useState(posts); // Filtrelenmiş gönderiler

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(query.toLowerCase())
        )
    );

    setFilteredPosts(filtered);
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      }
      renderItem={({ item }) => (
        <BlogCard
          title={item.title}
          content={item.content}
          tags={item.tags}
          likes={item.likes}
          comments={item.comments}
          onPress={() => onSelectPost(item)} // Tıklanınca gönderiyi seç
        />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default BlogList;

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
