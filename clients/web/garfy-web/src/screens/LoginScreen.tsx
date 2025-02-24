import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, getCurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            width: 56,
            height: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <LockOutlinedIcon sx={{ color: "white" }} />
        </Box>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Giriş Yap
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Kullanıcı Adı"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Şifre"
          type="password"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
          onClick={async () => {
            login();
            const username = (await getCurrentUser())?.username;
            setTimeout(() => {
              navigate(`/profile/${username}`);
            }, 1000);
          }}
        >
          Giriş Yap
        </Button>
        <Typography variant="body2" color="textSecondary">
          Devam etmek için giriş yapmalısınız.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
