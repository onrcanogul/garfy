import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../services/auth-service";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useAuth } from "../../contexts/AuthContext";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomDrawer({ open, setOpen }: CustomDrawerProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (text: string) => {
    if (text === "Social Media") navigate("/social-media");
    else if (text === "Blog") navigate("/blog");
    else if (text === "Profile") navigate("/profile/" + currentUser().username);
    else if (text === "Settings") navigate("/settings");
    else if (text === "Login") navigate("/login");
    else if (text === "Register") navigate("/register");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const rows =
    isAuthenticated === true
      ? ["Social Media", "Blog", "Profile"]
      : ["Login", "Register"];

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {rows.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(text)}>
              <ListItemIcon>
                {text === "Social Media" ? (
                  <CameraAltIcon />
                ) : text === "Blog" ? (
                  <QuestionMarkIcon />
                ) : text === "Profile" ? (
                  <AccountCircleIcon />
                ) : text === "Login" ? (
                  <LoginIcon />
                ) : text === "Register" ? (
                  <HowToRegIcon />
                ) : (
                  <ListItemIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      {isAuthenticated && (
        <List>
          {["Settings"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigate(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list}
    </SwipeableDrawer>
  );
}
