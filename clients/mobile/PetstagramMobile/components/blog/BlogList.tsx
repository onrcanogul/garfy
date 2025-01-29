import React from "react";
import { FlatList, TextInput, StyleSheet } from "react-native";
import BlogCard from "./BlogCard";

const BlogList = ({
  questions,
  onSelectPost,
  onEndReach,
  onEndReachedThreshold,
}) => {
  const [searchQuery, setSearchQuery] = React.useState(""); // Arama sorgusu
  const [filteredPosts, setFilteredPosts] = React.useState(questions); // Filtrelenmiş gönderiler

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = questions.filter(
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
      data={questions}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={onEndReachedThreshold}
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
          likes={item.status.users.length}
          comments={item.answers.length ?? 0}
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
