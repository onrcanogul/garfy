import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import Comment from "../../contracts/social-media/comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useAuth } from "../../contexts/AuthContext";

interface CommentModalProps {
  comments: Comment[];
  commentModalOpen: boolean;
  handleCloseComments: () => void;
  handleAddComment: (text: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const CommentInput = forwardRef(
  ({ handleAddComment }: { handleAddComment: (text: string) => void }, ref) => {
    const [text, setText] = useState("");

    useImperativeHandle(ref, () => ({
      reset: () => setText(""),
    }));

    return (
      <Box
        mt={2}
        mb={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          label="Yorum Yap"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "25%", ml: 2 }}
          onClick={() => {
            if (text.trim() !== "") {
              handleAddComment(text);
              setText("");
            }
          }}
        >
          {<AddCommentIcon />}
        </Button>
      </Box>
    );
  }
);

export const CommentModal = forwardRef(
  (
    {
      comments,
      commentModalOpen,
      handleCloseComments,
      handleAddComment,
    }: CommentModalProps,
    ref
  ) => {
    const { isAuthenticated } = useAuth();
    return (
      <Dialog open={commentModalOpen} onClose={handleCloseComments} fullWidth>
        <DialogTitle>Yorumlar ({comments.length})</DialogTitle>
        <DialogContent>
          {isAuthenticated && (
            <CommentInput ref={ref} handleAddComment={handleAddComment} />
          )}

          {comments.length > 0 ? (
            <List>
              {comments.map((comment, index) => (
                <Paper
                  key={index}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={"avatar.url"} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          fontWeight="bold"
                        >
                          {"oogul"}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="caption"
                            color="textSecondary"
                          >
                            {formatDate("18 July 2003")}
                          </Typography>
                          <Box mt={1}>
                            <Typography variant="body2">
                              {comment.content}
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Henüz yorum yok.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);
