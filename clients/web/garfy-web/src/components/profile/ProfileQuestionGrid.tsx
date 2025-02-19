import { Card, CardMedia, Grid } from "@mui/material";
import Question from "../../contracts/blog/question";

interface ProfileQuestionGridProps {
  questions: Question[] | undefined;
}

const ProfileQuestionGrid: React.FC<ProfileQuestionGridProps> = ({
  questions,
}) => {
  if (questions === undefined) {
    return "No Question";
  }
  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {questions.map((question) => (
        <Grid item xs={6} key={question.id}>
          <Card>
            <CardMedia
              component="img"
              height="250"
              width="250"
              image={"https://source.unsplash.com/600x400"}
              alt="Question"
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileQuestionGrid;
