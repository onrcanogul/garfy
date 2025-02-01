import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DetailScreen from "./BlogDetailScreen";
import BlogList from "../../components/blog/BlogList";
import { getQuestion } from "../../services/blog/question-service";
import Question from "../../contracts/question";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const BlogScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPost, setSelectedPost] = useState(null);
  const [questions, setQuestions] = useState<Question[]>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Soruları getiren fonksiyon
  const fetchQuestions = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const size = 10;
    const response = await getQuestion(page, size);
    if (response && response.length > 0) {
      setQuestions((prev) => {
        if (prev === undefined) return response;
        else return [...prev, ...response];
      });
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  // Ekran her odaklandığında (focus olduğunda) fetchQuestions çağrılır
  useFocusEffect(
    useCallback(() => {
      // Sayfayı sıfırlayıp yeniden veri çekme işlemi
      setQuestions([]);
      setPage(0);
      setHasMore(true);
      fetchQuestions();
    }, [])
  );

  return (
    <View style={styles.container}>
      {selectedPost ? (
        <DetailScreen
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <>
          <BlogList
            questions={questions}
            onSelectPost={setSelectedPost}
            onEndReach={fetchQuestions}
            onEndReachedThreshold={0.5}
          />

          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("CreateQuestion")}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </>
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
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
