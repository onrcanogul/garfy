import BaseEntity from "../base/base-entitiy";

interface PostStatus extends BaseEntity {
  users: string[];
  postId: string;
}

export default PostStatus;
