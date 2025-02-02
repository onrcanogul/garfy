import BaseEntity from "../base/base-entitiy";

interface CommentStatus extends BaseEntity {
  users: string[];
  commentId: string;
}

export default CommentStatus;
