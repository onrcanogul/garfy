import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/social-media/postSlice";
import { PostState } from "../features/states";
import CustomPost from "../components/social-media/CustomPost";

const SocialMedia = () => {
  const dispatch = useDispatch(); // redux actions
  const { posts, status, error }: PostState = useSelector(
    (state: any) => state.posts
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ page: 0, size: 10 }) as any);
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      {posts.map((post, index) => {
        return (
          <CustomPost
            key={index}
            author={post.createdBy}
            content={post.description}
            date={"18 July 2003"}
            comments={post.comments}
          />
        );
      })}
    </div>
  );
};

export default SocialMedia;
