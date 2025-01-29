import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DetailScreen from "./BlogDetailScreen";
import BlogList from "../../components/blog/BlogList";
import { getQuestion } from "../../services/blog/question-service";
import Question from "../../contracts/question";
import i18next from "i18next";
import i18n from "../../localization/i18n";

const NotFoundPartial: React.FC = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const BlogScreen: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [questions, setQuestions] = useState<Question[]>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const size = 10;
    const response = await getQuestion(page, size);
    if (response && response.length > 0) {
      setQuestions((prev) => {
        if (prev === undefined) return response;
        else [...prev, ...response];
      });
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {selectedPost ? (
        <DetailScreen
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : questions && questions.length > 0 ? (
        <BlogList
          questions={questions}
          onSelectPost={setSelectedPost}
          onEndReach={fetchQuestions}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <Text>Henüz soru bulunmuyor, bir tane sen oluştur.</Text>
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
