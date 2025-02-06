import BaseEntity from "../base/base-entitiy";

interface Profile extends BaseEntity {
  username: string;
  fullName: string;
  avatarPath: string;
  email: string;
  bio: string;
  rating: number;
}

export default Profile;
