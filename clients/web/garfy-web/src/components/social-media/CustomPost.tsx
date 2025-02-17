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
import PostStatus from "../../contracts/social-media/post-status";
import { like } from "../../services/social-media/post-service";
import Post from "../../contracts/social-media/post";
import { currentUser } from "../../services/auth-service";

interface PostProps {
  author: string;
  date: string;
  content: string;
  imageUrls: string[];
  comments: Comment[];
  onLikeClick: any;
  status: PostStatus;
  post: Post;
}

const CustomPost = ({ date, imageUrls, post }: PostProps) => {
  const [likes, setLikes] = useState(post.status.users.length);
  const [liked, setLiked] = useState(
    post.status.users.includes(currentUser().id)
  );

  const handleLike = async () => {
    like(
      post.id,
      (response) => {
        const isLiked = response === "Like";
        if (isLiked) {
          console.log(likes);
          setLikes(likes + 1);
          setLiked(true);
        } else {
          console.log(likes);
          setLikes(likes - 1);
          setLiked(false);
        }
      },
      () => {}
    );
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 2,
        fontWeight: "bold",
      }}
    >
      <CardHeader
        avatar={<Avatar>{post.createdBy}</Avatar>}
        title={"oogul"}
        subheader={date}
      />

      {post.imageUrls.length > 0 && ( // Eğer resim varsa göster
        <CardMedia
          component="img"
          height="500"
          image={imageUrls[0]}
          alt="Post image"
          sx={{ borderRadius: 2, objectFit: "contain", width: "100%" }}
        />
      )}
      <CardContent>
        <Typography variant="body1">{post.description}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <Typography>{likes}</Typography>

        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography>{post.comments.length}</Typography>

        <IconButton sx={{ marginLeft: "auto" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CustomPost;
