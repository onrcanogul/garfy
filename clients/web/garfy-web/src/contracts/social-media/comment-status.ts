import BaseEntity from "../base/base-entity";
import Comment from "./comment";
import PostStatus from "./post-status";

interface Post extends BaseEntity {
  title: string;
  description: string;
  comments: Comment[];
  status: PostStatus;
}

export default Post;
