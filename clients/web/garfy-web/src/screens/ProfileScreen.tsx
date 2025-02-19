import { useParams } from "react-router-dom";
import Profile from "../contracts/profile/profile";
import { Box, Typography } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile/profile-service";
import BlockUI from "../utils/block-ui";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePostGrid from "../components/profile/ProfilePostGrid";
import { getPosts } from "../services/social-media/post-service";
import Post from "../contracts/social-media/comment-status";
import Question from "../contracts/blog/question";
import { getByUser } from "../services/blog/question-service";
import ProfileQuestionGrid from "../components/profile/ProfileQuestionGrid";

const ProfileScreen: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const [userQuestions, setUserQuestions] = useState<Question[]>();
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
    setUserQuestions(await getByUser(0, 10, "oogul"));
    console.log(userQuestions);
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
      <ProfileHeader
        profile={profile}
        postCount={userPosts ? userPosts.length : 0}
        questionCount={userQuestions ? userQuestions.length : 0}
      />
      <ProfileTabs
        selectedTab={selectedTab}
        onTabChange={(_, newValue) => setSelectedTab(newValue)}
      />
      <Box sx={{ p: 2 }}>
        {selectedTab === 0 && <ProfilePostGrid posts={userPosts} />}
        {selectedTab === 1 && <ProfileQuestionGrid questions={userQuestions} />}
        {selectedTab === 2 && <ProfilePostGrid posts={userPosts} />}
      </Box>
    </Box>
  );
};

export { ProfileScreen, ProfileCard };
