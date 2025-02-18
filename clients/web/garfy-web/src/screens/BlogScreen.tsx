import { useEffect, useState } from "react";
import Question from "../contracts/blog/question";
import { getQuestion } from "../services/blog/question-service";
import QuestionList from "../components/blog/QuestionCard";
import BlockUI from "../utils/block-ui";

const Blog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    const questionsFromBackend = await getQuestion(0, 10);
    setQuestions(questionsFromBackend);
    console.log(questions);
    setLoading(false);
  };

  return (
    <>
      <QuestionList questions={questions} />
      <BlockUI open={loading} message="Sorular Yükleniyor" />
    </>
  );
};

export default Blog;
