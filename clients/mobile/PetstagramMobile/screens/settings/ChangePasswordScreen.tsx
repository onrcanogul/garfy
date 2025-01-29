import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    setErrorMessage("");
    Alert.alert("Success", "Your password has been changed successfully.");
    // Şifre değiştirme API çağrısı burada yapılabilir.
  };

  return (
    <View style={styles.container}>
      {/* Üstteki Bilgilendirme */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          For your account's security, please do not share your password with
          anyone. Use a strong password that includes letters, numbers, and
          symbols.
        </Text>
      </View>

      {/* Şifre Değiştirme Formu */}
      <View style={styles.formContainer}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  infoContainer: {
    backgroundColor: "#e7f1ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    color: "#004085",
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#213555", // Siyah arka plan
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Beyaz metin
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
