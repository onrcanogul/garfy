import { useEffect, useState } from "react";
import Question from "../contracts/blog/question";
import { getQuestion } from "../services/blog/question-service";
import QuestionList from "../components/blog/QuestionCard";
import BlockUI from "../utils/block-ui";
import AddButton from "../utils/add-button";
import CreateQuestionModal from "../components/blog/CreateQuestionModal";
import { useAuth } from "../contexts/AuthContext";

const Blog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      {isAuthenticated && (
        <>
          <CreateQuestionModal
            open={open}
            handleClose={handleClose}
            setQuestions={setQuestions}
          />
          <AddButton text="Soru Oluştur" onClick={() => handleOpen()} />
        </>
      )}

      <BlockUI open={loading} message="Sorular Yükleniyor" />
    </>
  );
};

export default Blog;
