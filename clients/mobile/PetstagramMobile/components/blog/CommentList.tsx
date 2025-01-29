import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CommentList = ({ comments }) => {
  // Yorumları ve beğeni sayılarını state ile takip edin
  const [localComments, setLocalComments] = useState(comments);

  const handleLike = (id) => {
    setLocalComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <FlatList
      data={localComments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          {/* Profil Resmi */}
          <Image style={styles.avatar} />

          {/* Kullanıcı Bilgileri ve Yorum */}
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.username}>oogul</Text>
              <Text style={styles.timestamp}>{item.createdDate}</Text>
            </View>
            <Text style={styles.commentText}>{item.content}</Text>

            {/* Beğeni Sayısı */}
            <View style={styles.likesContainer}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons name="heart" size={16} color="#f00" />
              </TouchableOpacity>
              <Text style={styles.likesText}>{item.likes ?? 0}</Text>
            </View>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default CommentList;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#213555",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#555",
  },
});
