import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface HeaderProps {
  selectedValue: string;
  onMenuPress: () => void;
  onSelectPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedValue,
  onMenuPress,
  onSelectPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Uygulama Başlığı</Text>
        <TouchableOpacity onPress={onSelectPress} style={styles.selectButton}>
          <Text style={styles.selectText}>{selectedValue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#333",
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#333",
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginLeft: 10,
  },
  selectButton: {
    marginLeft: "auto",
    backgroundColor: "#555",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  menuIcon: {
    color: "#fff",
    fontSize: width * 0.06,
  },
});

export default Header;
