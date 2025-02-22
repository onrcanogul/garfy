import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface SettingItemProps {
  title: any;
  icon: any;
  onClick: any;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, icon, onClick }) => {
  return (
    <ListItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default SettingItem;
