import { useEffect, useState } from "react";
import Question from "../contracts/blog/question";
import { getQuestion } from "../services/blog/question-service";
import QuestionList from "../components/blog/QuestionCard";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const BlogScreen = () => {
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

interface BlockUIProps {
  open: any;
  message: string;
}
const BlockUI = (props: BlockUIProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={props.open}
    >
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography mt={2}>{props.message}</Typography>
      </Box>
    </Backdrop>
  );
};

export default BlogScreen;
