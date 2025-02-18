import { useParams } from "react-router-dom";
import Profile from "../contracts/profile/profile";
import { Box, Grid, Typography } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile/profile-service";
import BlockUI from "../utils/block-ui";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePostGrid from "../components/profile/ProfilePostGrid";
import { getPosts } from "../services/social-media/post-service";
import Post from "../contracts/social-media/comment-status";

const ProfileScreen: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const [userPosts, setUserPosts] = useState<Post[]>();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    console.log(username);
    setLoading(true);
    getProfile(
      username,
      (profile) => {
        setProfile(profile);
      },
      (error) => {
        alert(error);
      }
    );
    getPosts(
      0,
      10,
      (data) => {
        setUserPosts(data.data);
        console.log(data.data);
      },
      (error) => {
        alert(error);
      }
    );
    setLoading(false);
  };

  if (!profile) {
    return (
      <Typography variant="h6" color="error" align="center">
        Profile not found
      </Typography>
    );
  }

  if (loading) {
    return <BlockUI open={loading} message="Profil yükleniyor" />;
  }

  return (
    <Box>
      <ProfileHeader profile={profile} />
      <ProfileTabs
        selectedTab={selectedTab}
        onTabChange={(_, newValue) => setSelectedTab(newValue)}
      />
      <Box sx={{ p: 2 }}>
        {selectedTab === 0 && <ProfilePostGrid posts={userPosts} />}
        {selectedTab === 1 && <ProfilePostGrid posts={userPosts} />}
        {selectedTab === 2 && <ProfilePostGrid posts={userPosts} />}
      </Box>
    </Box>
  );
};

export { ProfileScreen, ProfileCard };
