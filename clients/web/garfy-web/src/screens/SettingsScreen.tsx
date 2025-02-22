import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Brightness4, Language, Lock, ExitToApp } from "@mui/icons-material";

const SettingsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("");

  const settingsOptions = [
    { label: "Theme Update", key: "theme", icon: <Brightness4 /> },
    { label: "Language Selection", key: "language", icon: <Language /> },
    { label: "Change Password", key: "password", icon: <Lock /> },
    { label: "Logout", key: "logout", icon: <ExitToApp /> },
  ];

  const handleOpen = (key: any) => {
    setSelectedSetting(key);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSetting("");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          width: "400px",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <List>
          {settingsOptions.map((option, index) => (
            <React.Fragment key={option.key}>
              <ListItem
                onClick={() => handleOpen(option.key)}
                sx={{
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
              {index < settingsOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {settingsOptions.find((opt) => opt.key === selectedSetting)?.label}
        </DialogTitle>
        <DialogContent>
          {selectedSetting === "theme" && (
            <Button variant="contained" color="primary">
              Toggle Theme
            </Button>
          )}
          {selectedSetting === "language" && (
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="tr">Türkçe</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </FormControl>
          )}
          {selectedSetting === "password" && (
            <>
              <TextField
                label="Old Password"
                type="password"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Update Password
              </Button>
            </>
          )}
          {selectedSetting === "logout" && (
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;
