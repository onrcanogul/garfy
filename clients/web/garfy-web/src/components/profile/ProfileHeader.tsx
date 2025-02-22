import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import Profile from "../../contracts/profile/profile";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileHeaderProps {
  profile: Profile;
  postCount: number;
  questionCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  postCount,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        textAlign: "center",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Avatar
        src={profile.avatarPath}
        alt={profile.username}
        sx={{ width: 100, height: 100, margin: "auto" }}
      />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {profile.username}
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: -1.5 }}>
        <Grid item>
          <Typography variant="body1" fontWeight="bold">
            {postCount}
          </Typography>
          <Typography variant="body2">Posts</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" fontWeight="bold">
            {profile.followers.length}
          </Typography>
          <Typography variant="body2">Followers</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" fontWeight="bold">
            {profile.following.length}
          </Typography>
          <Typography variant="body2">Following</Typography>
        </Grid>
      </Grid>
      {isAuthenticated && (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 0 }}>
          <Grid item>
            <Button variant="contained" color="primary">
              Follow
            </Button>
          </Grid>
          {/* <Grid item>
          <Button variant="outlined" color="secondary">
            Message
          </Button>
        </Grid> */}
          {/* <Grid item>
          <Button variant="outlined">Edit Profile</Button>
        </Grid> */}
        </Grid>
      )}
    </Box>
  );
};

export default ProfileHeader;
