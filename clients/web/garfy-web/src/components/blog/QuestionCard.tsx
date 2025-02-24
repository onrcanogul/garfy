import React, { useState } from "react";
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
  CardMedia,
  Box,
  Alert,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";
import Question from "../../contracts/blog/question";
import BlogDetailModal from "./BlogDetailModal";
import { CheckIcon } from "lucide-react";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 480,
          margin: "auto",
          boxShadow: 3,
          borderRadius: 3,
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 6,
          },
        }}
        onClick={handleOpen}
      >
        {/* Kapak Resmi */}
        {question.imageUrls.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={question.imageUrls[0]}
            alt="cover image"
            sx={{
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
            }}
          />
        )}

        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {question.userName ? question.userName[0].toUpperCase() : "U"}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {question.title}
            </Typography>
          }
          subheader={
            <>
              <Typography
                variant="body2"
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                {question.userName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {question.shortContent}
              </Typography>
            </>
          }
        />

        <CardContent>
          {/* Etiketler */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {question.tags.map((tag) => (
              <Chip
                key={tag.name}
                label={`#${tag.name}`}
                sx={{
                  bgcolor: "#e3f2fd",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Box>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "space-between", paddingX: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="like">
              <ThumbUp sx={{ color: "#1976d2" }} />
            </IconButton>
            <Typography variant="body2">10</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="comments">
              <Comment sx={{ color: "#1976d2" }} />
            </IconButton>
            <Typography variant="body2">{question.answers.length}</Typography>
          </Box>
        </CardActions>
      </Card>

      {/* Modal */}
      <BlogDetailModal question={question} open={open} onClose={handleClose} />
    </>
  );
};

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <>
      <Alert
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
        sx={{ mt: 2 }}
      >
        Soru yüklerken ilk seçtiğiniz resim, blog sayfasında sergilenecektir,
        diğer resimler blogun detayına gidilince görülecektir.
      </Alert>
      <Grid container spacing={3} justifyContent="center" mt={1} pb={2}>
        {questions.map((question) => (
          <Grid item xs={12} sm={12} md={12} key={question.id}>
            <QuestionCard question={question} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default QuestionList;
