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

interface Comment {
  id: number;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
}

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
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating API call for paginated comments
    const fetchComments = () => {
      const newComments = Array.from({ length: 10 }, (_, index) => ({
        id: comments.length + index + 1,
        username: `User ${comments.length + index + 1}`,
        avatarUrl: "https://i.pravatar.cc/40",
        content: "This is a dynamically loaded comment.",
        createdAt: new Date().toISOString().split("T")[0],
      }));
      setComments((prev) => [...prev, ...newComments]);
    };
    fetchComments();
  }, [page]);

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

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          username: "New User",
          avatarUrl: "https://i.pravatar.cc/42",
          content: newComment,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewComment("");
    }
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
                <Avatar src={comment.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.username}
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
                      {comment.createdAt}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Yorum Ekleme Inputu */}
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
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetailModal;
