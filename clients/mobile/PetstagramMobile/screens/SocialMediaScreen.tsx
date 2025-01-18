import React from "react";
import { View } from "react-native";
import PostList from "../components/social-media/PostList";

const SocialMediaScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <PostList />
  </View>
);

export default SocialMediaScreen;
