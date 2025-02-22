import { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { registerUser } from "../services/auth-service";
import ToastrService from "../services/toastr-service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (confirmPassword !== password) {
      ToastrService.warning("Şifreler uyuşmuyor");
      return;
    }
    const result = await registerUser(username, email, password);
    if (result) {
      ToastrService.success("Kayıt işlemi başarılı.");
    } else {
      ToastrService.error("Kayıt işlemi sırasında hata meydana geldi.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", mt: 10, borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Kayıt Ol
        </Typography>

        <TextField
          fullWidth
          label="Kullanıcı Adı"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="E-Posta"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Şifre"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Şifreyi Onayla"
          variant="outlined"
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2, padding: 1 }}
          onClick={handleRegister}
        >
          Kayıt Ol
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
