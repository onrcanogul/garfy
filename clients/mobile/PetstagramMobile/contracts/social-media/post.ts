import BaseEntity from "../base/base-entitiy";
import Comment from "./comment";
import PostStatus from "./post-status";

interface Post extends BaseEntity {
  title: string;
  description: string;
  comments: Comment[];
  status: PostStatus;
}

export default Post;
