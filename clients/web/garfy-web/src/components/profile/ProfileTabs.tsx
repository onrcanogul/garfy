import { Tab, Tabs } from "@mui/material";
import { BookmarkBorder, GridOn } from "@mui/icons-material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

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
      <Tab icon={<QuestionMarkIcon />} />
      <Tab icon={<BookmarkBorder />} />
    </Tabs>
  );
};

export default ProfileTabs;
