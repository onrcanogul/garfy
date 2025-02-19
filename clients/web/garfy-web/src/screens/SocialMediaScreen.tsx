import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/social-media/postSlice";
import { PostState } from "../features/states";
import CustomPost from "../components/social-media/CustomPost";
import BlockUI from "../utils/block-ui";

import CreatePostModal from "../components/social-media/CreatePostModal";
import AddButton from "../utils/add-button";

const SocialMedia = () => {
  const dispatch = useDispatch();
  const { posts, status, error }: PostState = useSelector(
    (state: any) => state.posts
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ page: 0, size: 10 }) as any);
    }
  }, [dispatch, status]);

  const handleLikeClick = () => {};

  if (status === "loading")
    return (
      <BlockUI open={status === "loading"} message="Gönderiler yükleniyor" />
    );
  if (status === "failed") return <p>Error: {error}</p>;

  const handleSubmit = (values: any) => {
    console.log("Yeni Gönderi:", values);
  };

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
            imageUrls={post.imageUrls}
            onLikeClick={() => handleLikeClick}
            status={post.status}
            post={post}
          />
        );
      })}

      <AddButton text="Gönderi Oluştur" onClick={() => handleOpen()} />

      <CreatePostModal
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SocialMedia;
