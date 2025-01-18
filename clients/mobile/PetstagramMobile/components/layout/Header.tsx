import { useNavigationState } from "@react-navigation/native";
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

const Header: React.FC<HeaderProps> = ({ selectedValue, onSelectPress }) => {
  const state = useNavigationState((state) => state);
  const currentTab = state?.routes?.[state.index]?.name || "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Garfy</Text>
        {currentTab === "Social Media" ? (
          <TouchableOpacity onPress={onSelectPress} style={styles.selectButton}>
            <Text style={styles.selectText}>{selectedValue}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#213555",
    flex: 0.13,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#213555",
    paddingHorizontal: 5,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.04,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 10,
  },
  selectButton: {
    marginLeft: "auto",
    backgroundColor: "#213555",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
});

export default Header;
