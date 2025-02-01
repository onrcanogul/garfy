import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createQuestion } from "../../services/blog/question-service";

const CreateQuestionScreen = () => {
  const [title, setTitle] = useState(""); // Title için state
  const [shortContent, setShortContent] = useState(""); // Short Content için state
  const [content, setContent] = useState(""); // Content için state
  const navigation = useNavigation();

  const handlePress = async () => {
    await createQuestion({
      title: title,
      shortContent: shortContent,
      content: content,
      userId: "9bbb8b41-5c69-40f9-9023-94859f06c683",
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#aaa"
        value={title} // State ile bağlama
        onChangeText={setTitle} // State güncellemesi
      />

      <Text style={styles.label}>Short Content</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter short content"
        placeholderTextColor="#aaa"
        value={shortContent} // State ile bağlama
        onChangeText={setShortContent} // State güncellemesi
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter detailed content"
        placeholderTextColor="#aaa"
        multiline={true}
        value={content} // State ile bağlama
        onChangeText={setContent} // State güncellemesi
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Soru Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#212529",
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  textArea: {
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
