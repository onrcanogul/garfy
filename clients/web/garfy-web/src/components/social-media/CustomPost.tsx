import { useRef, useState } from "react";
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
import { CommentModal } from "./CommentModal";
import { createComment } from "../../services/social-media/comment-service";
import ToastrService from "../../services/toastr-service";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PostProps {
  author: string;
  date: string;
  content: string;
  imageUrls: string[];
  comments: Comment[];
  status: PostStatus;
  post: Post;
}

const CustomPost = ({ date, imageUrls, post }: PostProps) => {
  const { isAuthenticated } = useAuth();
  const [likes, setLikes] = useState(post.status.users.length);
  const [liked, setLiked] = useState(
    post.status.users.includes(currentUser().id)
  );
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const commentInputRef = useRef<{ reset: () => void } | null>(null);

  const handleLike = async () => {
    if (isAuthenticated === false) {
      ToastrService.error("Öncelikle giriş yapmalısınız");
      return;
    }
    like(
      post.id,
      (response) => {
        const isLiked = response === "Like";
        if (isLiked) {
          setLikes(likes + 1);
          setLiked(true);
        } else {
          setLikes(likes - 1);
          setLiked(false);
        }
      },
      () => {}
    );
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleOpenComments = () => {
    setCommentModalOpen(true);
  };

  const handleCloseComments = () => {
    setCommentModalOpen(false);
  };

  const handleAddComment = (text: string) => {
    createComment(
      { postId: post.id, content: text, userId: currentUser().id },
      (data) => {
        setComments((prev) => [...prev, data]);
        ToastrService.success("Yorum oluşturuldu.");
        commentInputRef.current?.reset();
      },
      () => {
        toastr.error("Yorum oluşturulurken hata meydana geldi");
      }
    );
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "60%",
          margin: "20px auto",
          padding: 2,
          fontWeight: "bold",
        }}
      >
        <CardHeader
          avatar={<Avatar>{post.createdBy}</Avatar>}
          title={
            <Link
              to={`/profile/oogul`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              oogul
            </Link>
          }
          subheader={date}
        />

        {post.imageUrls.length > 0 && (
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

          <IconButton onClick={handleOpenComments}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography>{comments.length}</Typography>

          <IconButton sx={{ marginLeft: "auto" }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Yorum Modalı */}
      <CommentModal
        comments={comments}
        handleCloseComments={handleCloseComments}
        commentModalOpen={commentModalOpen}
        handleAddComment={handleAddComment}
        ref={commentInputRef}
      />
    </>
  );
};

export default CustomPost;
