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
import { createProfile } from "../../services/profile/profile-service";
import ToastrService from "../../services/toastr-service";
import axios from "axios";
import { baseUrl } from "../../constants/endpoint";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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

interface ProfileCreateScreenProps {
  open: boolean;
  setOpen: any;
}

const ProfileCreateScreen: React.FC<ProfileCreateScreenProps> = ({
  open,
  setOpen,
}) => {
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const profileData = { bio, fullName: fullname, username: username };

      const profile = await new Promise<any>((resolve, reject) => {
        createProfile(
          profileData,
          (data) => resolve(data),
          (error) => reject(error)
        );
      });

      ToastrService.success("Profil oluşturuldu.");

      if (avatarFile) {
        const formData = new FormData();
        formData.append("files", avatarFile);
        formData.append("id", profile.id);
        formData.append("fileType", "2");
        formData.append("container", "media");

        await axios.post(`${baseUrl}/media/api/media`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        ToastrService.success("Profil resmi yüklendi.");
        setTimeout(() => {}, 1500);
        navigate(`/profile/${(await getCurrentUser())?.username}`);
      }
      setOpen(false);
    } catch (error) {
      ToastrService.error("Profil oluştururken bir hata meydana geldi.");
    }
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
            <StyledAvatar src={avatarPreview}>
              {!avatarPreview && "Resim"}
            </StyledAvatar>
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
