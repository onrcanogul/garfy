import Post from "../contracts/social-media/post";

export interface PostState {
  posts: Post[];
  status: string;
  error: string | null;
}
