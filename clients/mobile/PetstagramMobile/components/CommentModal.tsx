import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
}

interface CommentModalProps {
  isVisible: boolean;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (text: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  comments,
  onClose,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true} // Arka planı şeffaf yapar
      animationType="fade" // Animasyonu tamamen kaldırır
      onRequestClose={onClose} // Android'deki geri tuşunu işler
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContainer}>
                {/* Modal içeriği */}
                <FlatList
                  data={comments}
                  keyExtractor={(item) => item.id.toString()}
                  inverted
                  renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                      <Text style={styles.username}>{item.username}</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                      <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                  )}
                  contentContainerStyle={{ paddingTop: 10 }}
                />
                {/* Yorum ekleme alanı */}
                <View style={styles.addCommentContainer}>
                  <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Yorum yaz..."
                    style={styles.textInput}
                    onSubmitEditing={handleAddComment}
                  />
                  <TouchableOpacity
                    onPress={handleAddComment}
                    style={styles.sendButton}
                  >
                    <Text style={styles.sendButtonText}>Gönder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka planı karartır
    justifyContent: "flex-end", // Modalı alt tarafa hizalar
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    maxHeight: height * 0.7, // Modalın maksimum yüksekliğini sınırlar
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CommentModal;
