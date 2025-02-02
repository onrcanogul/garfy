import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // İkonlar için Feather kütüphanesi
import CommentModal from "./CommentModal";
import Comment from "../../contracts/social-media/comment";

const { width } = Dimensions.get("window");

interface PostCardProps {
  username: string;
  profileImage: string;
  images: string[];
  likes: number;
  commentsCount: number;
  description: string;
  postComments: Comment[];
}
const PostCard: React.FC<PostCardProps> = ({
  username,
  profileImage,
  images,
  likes,
  commentsCount,
  description,
  postComments,
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [comments, setComments] = React.useState([
    {
      id: 1,
      username: "user123",
      text: "Harika bir paylaşım!",
      timestamp: "2 saat önce",
    },
    {
      id: 2,
      username: "doglover",
      text: "Bunu çok sevdim!",
      timestamp: "1 gün önce",
    },
  ]);

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollX / width);
    setActiveIndex(currentIndex);
  };

  const handleLikePress = () => {
    console.log("Beğeni butonuna basıldı!");
  };

  const handleCommentPress = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      id: comments.length + 1,
      username: "currentUser",
      text,
      timestamp: "Şimdi",
    };
    setComments([...comments, newComment]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="more-horizontal" size={24} color="#000" />{" "}
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.postImage} />
          </View>
        )}
      />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Description ekleme */}

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleLikePress} style={styles.actionItem}>
          <Icon name="heart" size={24} color="#000" />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCommentPress}
          style={styles.actionItem}
        >
          <Icon name="message-circle" size={24} color="#000" />{" "}
          <Text style={styles.actionText}>{commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Paylaş butonuna basıldı!")}
          style={styles.actionItem}
        >
          <Icon name="share-2" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{description}</Text>

      <CommentModal
        isVisible={isModalVisible}
        comments={postComments}
        onClose={handleCloseModal}
        onAddComment={handleAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    width: "100%",
    margin: 0,
    padding: 0,
    marginBottom: 20,
  },
  imageContainer: {
    width: width,
    height: width,
    overflow: "hidden",
  },
  postImage: {
    width: width,
    height: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#213555",
  },
  inactiveDot: {
    backgroundColor: "#C4C4C4",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#000",
  },
  description: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },
});

export default PostCard;
