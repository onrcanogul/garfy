import BaseEntity from "../base/base-entity";

interface PostStatus extends BaseEntity {
  users: string[];
  postId: string;
}

export default PostStatus;
