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

const { width } = Dimensions.get("window");

interface PostCardProps {
  username: string;
  profileImage: string;
  images: string[];
  likes: number;
  commentsCount: number;
}
const PostCard: React.FC<PostCardProps> = ({
  username,
  profileImage,
  images,
  likes,
  commentsCount,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0); // Aktif resmin indeksini tutar

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollX / width);
    setActiveIndex(currentIndex);
  };

  const handleLikePress = () => {
    console.log("Beğeni butonuna basıldı!");
  };

  const handleCommentPress = () => {
    console.log("Yorum butonuna basıldı!");
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
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.postImage} />
          </View>
        )}
        snapToInterval={width} // Tam genişlikte kaydırma
        snapToAlignment="start"
        decelerationRate="fast" // Daha yavaş kaydırma
        scrollEventThrottle={16} // Daha pürüzsüz kaydırma animasyonu
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: 0 }} // FlatList'in padding'ini kaldır
        style={{ margin: 0 }} // FlatList dış boşluklarını kaldır
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

        {/* Paylaş İkonu */}
        <TouchableOpacity
          onPress={() => console.log("Paylaş butonuna basıldı!")}
          style={styles.actionItem}
        >
          <Icon name="share-2" size={24} color="#000" />{" "}
          {/* Feather'dan "share" ikonu */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    width: "100%",
    margin: 0,
    padding: 0,
    marginBottom: 20, // Kartlar arasındaki boşluk
  },
  imageContainer: {
    width: width, // Ekran genişliği kadar
    height: width, // Kare görünüm
    overflow: "hidden", // Kenar taşmalarını engelle
    margin: 0, // Herhangi bir dış boşluk bırakma
    padding: 0, // İç boşluk bırakma
  },
  postImage: {
    width: width, // Tam ekran genişliği
    height: "100%", // Kapsayıcı yüksekliğini doldur
    resizeMode: "cover", // Resmi kapsayıcıya oturt
    margin: 0,
    padding: 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Kullanıcı adı ve ikon arasında boşluk
    marginBottom: 10,
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
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "#C4C4C4",
  },
  actionsContainer: {
    flexDirection: "row", // Yana doğru hizalama
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start", // Başlangıçtan hizala
  },
  actionItem: {
    flexDirection: "row", // İkon ve metin yana yana
    alignItems: "center",
    marginRight: 15, // Her bir aksiyon arasında boşluk
  },
  actionText: {
    fontSize: 14,
    marginLeft: 5, // İkon ve sayı arasında boşluk
    color: "#000",
  },
});

export default PostCard;
