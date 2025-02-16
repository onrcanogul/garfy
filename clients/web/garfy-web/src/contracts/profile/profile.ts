import BaseEntity from "../base/base-entity";
import { Friendship } from "./friendship";

interface Profile extends BaseEntity {
  username: string;
  fullName: string;
  avatarPath: string;
  email: string;
  bio: string;
  rating: number;
  followers: Friendship[];
  following: Friendship[];
}

export default Profile;
