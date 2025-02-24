import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Question from "../../contracts/blog/question";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useAuth } from "../../contexts/AuthContext";
import Answer from "../../contracts/blog/answer";
import { createAnswer } from "../../services/blog/answer-service";
import ToastrService from "../../services/toastr-service";

interface BlogDetailModalProps {
  open: boolean;
  onClose: () => void;
  question: Question;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  open,
  onClose,
  question,
}) => {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Answer[]>(question.answers);
  const [page, setPage] = useState(1);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        commentsContainerRef.current &&
        window.innerHeight + window.scrollY >=
          commentsContainerRef.current.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const handleAddComment = async () => {
    await createAnswer(
      {
        content: newComment,
        questionId: question.id,
        userName: (await getCurrentUser())?.username,
      },
      (data) => {
        setComments((prev) => [...prev, data!]);
        ToastrService.success("Yorum eklendi.");
      },
      () => {
        ToastrService.error("Yorum eklenirken bir hata meydana geldi");
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {question.title}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent ref={commentsContainerRef}>
        <Typography variant="subtitle1" color="text.secondary">
          {question.shortContent}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {question.content}
        </Typography>
        {question.imageUrls.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <ImageGallery
              items={question.imageUrls.map((img) => ({
                original: img,
                thumbnail: img,
              }))}
              showPlayButton={false}
            />
          </div>
        )}

        {/* Yorumlar */}
        <Typography variant="h6" sx={{ marginTop: 4 }}>
          Comments
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={comment.userName}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {comment.content}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {"18 July 2003"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Yorum Ekleme Inputu */}
        {isAuthenticated && (
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginLeft: 2 }}
            >
              Send
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetailModal;
