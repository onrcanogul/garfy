import { useEffect, useState } from "react";
import Question from "../contracts/blog/question";
import { getQuestion } from "../services/blog/question-service";
import QuestionList from "../components/blog/QuestionCard";
import BlockUI from "../utils/block-ui";
import AddButton from "../utils/add-button";
import CreateQuestionModal from "../components/blog/CreateQuestionModal";

const Blog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);

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
      <BlockUI open={loading} message="Sorular Yükleniyor" />
      <AddButton text="Soru Oluştur" onClick={() => handleOpen()} />
      <CreateQuestionModal
        open={open}
        handleClose={handleClose}
        setQuestions={setQuestions}
      />
    </>
  );
};

export default Blog;
