import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  CardMedia,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Comment from "../../contracts/social-media/comment";

interface PostProps {
  author: string;
  date: string;
  content: string;
  image?: string; // Opsiyonel resim alanı
  comments: Comment[];
}

const CustomPost = ({ author, date, content, image, comments }: PostProps) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "20px auto", padding: 2 }}>
      <CardHeader
        avatar={<Avatar>{author}</Avatar>}
        title={author}
        subheader={date}
      />

      {image && ( // Eğer resim varsa göster
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="Post image"
          sx={{ borderRadius: 2, objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography variant="body1">{content}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <Typography>{likes}</Typography>

        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography>{comments.length}</Typography>

        <IconButton sx={{ marginLeft: "auto" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CustomPost;
