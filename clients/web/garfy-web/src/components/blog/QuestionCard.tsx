import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";
import Question from "../../contracts/blog/question";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        marginTop: 1,
      }}
    >
      <CardHeader
        avatar={<Avatar>{question.userName ?? "oogul"}</Avatar>}
        title={question.title}
        subheader={question.shortContent}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {question.content}
        </Typography>
        <div style={{ marginTop: 10 }}>
          {question.tags.map((tag) => (
            <Chip
              key={tag.name}
              label={`#${tag.name}`}
              sx={{ marginRight: 0.5 }}
            />
          ))}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <ThumbUp />
        </IconButton>
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          {10 || 0}
        </Typography>
        <IconButton aria-label="comments">
          <Comment />
        </IconButton>
        <Typography variant="body2">{question.answers.length}</Typography>
      </CardActions>
    </Card>
  );
};

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <Grid container spacing={1} justifyContent="center">
      {questions.map((question) => (
        <Grid item xs={12} sm={6} key={question.id}>
          <QuestionCard question={question} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionList;
