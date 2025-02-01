import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createAnswer, like } from "../../services/blog/answer-service";
import { currentUser } from "../../services/auth-service";

const CommentList = ({ comments, questionId }) => {
  const [localComments, setLocalComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const updatedComments = comments.map((comment) => ({
      ...comment,
      isLiked: comment.status.users.includes(currentUser()),
    }));
    setLocalComments(updatedComments);
  }, [comments]);

  const handleLike = async (id) => {
    await like(
      id,
      (response) => {
        const isLiked = response === "Like";
        setLocalComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id
              ? {
                  ...comment,
                  isLiked,
                  status: {
                    ...comment.status,
                    users: isLiked
                      ? [...comment.status.users, currentUser()]
                      : comment.status.users.filter(
                          (user) => user !== currentUser()
                        ),
                  },
                }
              : comment
          )
        );
      },
      null
    );
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const comment = {
        content: newComment,
        questionId: questionId,
        userId: currentUser(),
      };
      await createAnswer(
        comment,
        (data) => {
          setLocalComments((prev) => [data, ...prev]);
          setNewComment("");
          setModalVisible(false);
        },
        null
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Yorum Listesi */}
      <FlatList
        data={localComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.username}>oogul</Text>
                <Text style={styles.timestamp}>{item.createdDate}</Text>
              </View>
              <Text style={styles.commentText}>{item.content}</Text>
              <View style={styles.likesContainer}>
                <TouchableOpacity onPress={() => handleLike(item.id)}>
                  <Ionicons
                    name="heart"
                    size={20}
                    color={item.isLiked ? "red" : "black"}
                  />
                </TouchableOpacity>
                <Text style={styles.likesText}>{item.status.users.length}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled" // Klavye tıklamalarını işler
      />

      {/* Yorum Ekleme Butonu */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add an Answer</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Write your answer..."
              value={newComment}
              onChangeText={setNewComment}
              multiline={true}
              numberOfLines={3}
            />
            <Button title="Create Answer" onPress={handleAddComment} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commentContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentContent: {
    width: "100%",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
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
    marginTop: 8,
  },
  likesText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#213555",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#213555",
  },
  modalInput: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#f00",
    fontSize: 16,
    fontWeight: "bold",
  },
});
