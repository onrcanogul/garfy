import BaseEntity from "../base/base-entity";
import CommentStatus from "./comment-status";

interface Comment extends BaseEntity {
  userId: string;
  content: string;
  postId: string;
  status: CommentStatus;
}

export default Comment;
