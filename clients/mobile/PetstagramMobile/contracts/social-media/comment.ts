import BaseEntity from "../base/base-entitiy";
import CommentStatus from "./comment-status";

interface Comment extends BaseEntity {
  userId: string;
  content: string;
  postId: string;
  status: CommentStatus;
}

export default Comment;
