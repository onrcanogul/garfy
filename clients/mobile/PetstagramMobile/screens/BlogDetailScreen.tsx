import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImageCarousel from "../components/blog/ImageCarousel";
import CommentList from "../components/blog/CommentList";

const DetailScreen = ({ post, onBack }) => {
  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>{post.title}</Text>

      {/* İçerik */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Resimler */}
      <View style={styles.imageSection}>
        <ImageCarousel images={post.images} />
      </View>

      {/* Yorumlar */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        <CommentList comments={post.commentsList} />
      </View>

      {/* Geri Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
  imageSection: {
    marginBottom: 16,
  },
  commentsSection: {
    flex: 1, // Yorumların kalan alanı kaplamasını sağlamak
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#213555",
    marginBottom: 8,
  },
  backButton: {
    padding: 12,
    backgroundColor: "#213555",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
