import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { List } from "lucide-react";

interface AnswerSectionProps {
  comments: any[];
  handleAddComment: any;
  newComment: any;
  setNewComment: any;
}

const AnswerSection: React.FC<AnswerSectionProps> = ({
  comments,
  handleAddComment,
  newComment,
  setNewComment,
}) => {
  return (
    <>
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
    </>
  );
};

export default AnswerSection;
