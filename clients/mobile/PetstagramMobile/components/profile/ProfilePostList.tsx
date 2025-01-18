import React from "react";
import { FlatList, View, Image, StyleSheet, Dimensions } from "react-native";

interface Post {
  id: number;
  image: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2; // Sütun sayısı
  const spacing = 8;
  const totalSpacing = spacing * (numColumns + 1);
  const imageSize = (screenWidth - totalSpacing) / numColumns;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View
          style={[
            styles.postContainer,
            { width: imageSize, height: imageSize },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  postContainer: {
    margin: 5.6,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  postImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default PostList;
