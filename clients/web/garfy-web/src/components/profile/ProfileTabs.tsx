import { Tab, Tabs } from "@mui/material";
import { FavoriteBorder, BookmarkBorder, GridOn } from "@mui/icons-material";

interface ProfileTabsProps {
  selectedTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <Tabs value={selectedTab} onChange={onTabChange} centered>
      <Tab icon={<GridOn />} />
      <Tab icon={<FavoriteBorder />} />
      <Tab icon={<BookmarkBorder />} />
    </Tabs>
  );
};

export default ProfileTabs;
