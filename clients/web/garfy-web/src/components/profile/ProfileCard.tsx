import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Profile from "../../contracts/profile/profile";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 3, borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profile.avatarPath}
            alt={profile.username}
            sx={{ width: 80, height: 80 }}
          />
        }
        title={<Typography variant="h6">{profile.fullName}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            @{profile.username}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {profile.bio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {profile.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {profile.rating.toFixed(1)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Followers: {profile.followers.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Following: {profile.following.length}
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary">
              Follow
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="secondary">
              Message
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
