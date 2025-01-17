import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface BlogCardProps {
  title: string;
  content: string;
  tags: { id: number; name: string }[];
  likes: number;
  comments: number;
  onPress: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  tags,
  likes,
  comments,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => {
        console.log(`Card pressed: ${title}`); // Tıklamanın tetiklendiğini kontrol etmek için
        onPress();
      }}
    >
      {/* Kart içeriği */}
      <Text style={styles.blogTitle}>{title}</Text>
      <Text style={styles.blogContent}>{content.slice(0, 100)}...</Text>

      {/* Etiketler */}
      <FlatList
        data={tags}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>#{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.tagsContainer}
      />

      {/* Beğeni ve Yorum Sayıları */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Ionicons name="heart-outline" size={16} color="#000" />
          <Text style={styles.statText}>{likes}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="chatbubble-outline" size={16} color="#000" />
          <Text style={styles.statText}>{comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  blogCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#213555",
  },
  blogContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#eef2ff",
    padding: 6,
    marginRight: 8,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#213555",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#555",
  },
});
