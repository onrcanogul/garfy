import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "16px",
    padding: "20px",
    maxWidth: "400px",
  },
});

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: "auto",
  cursor: "pointer",
  border: "2px solid #3f51b5",
});

const StyledButton = styled(Button)({
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  fontWeight: "bold",
});

const ProfileCreateScreen: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log("Profile Saved:", { username, fullname, bio, avatar });
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Profil Oluştur
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <label htmlFor="avatar-upload">
            <input
              type="file"
              id="avatar-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <StyledAvatar src={avatar}>{!avatar && "Resim"}</StyledAvatar>
          </label>
        </Box>

        <TextField
          fullWidth
          label="Kullanıcı Adı"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Ad Soyad"
          variant="outlined"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Biyografi"
          variant="outlined"
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <StyledButton variant="contained" color="primary" onClick={handleSave}>
          Kaydet
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ProfileCreateScreen;
