import { Card, CardMedia, Grid } from "@mui/material";
import Post from "../../contracts/social-media/post";

interface PostGridProps {
  posts: Post[] | undefined;
}

const ProfilePostGrid: React.FC<PostGridProps> = ({ posts }) => {
  if (posts === undefined) {
    return "No Post";
  }
  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {posts.map((post) => (
        <Grid item xs={6} key={post.id}>
          <Card>
            <CardMedia
              component="img"
              height="350"
              width="250"
              image={post.imageUrls[0]}
              alt="Post"
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfilePostGrid;
