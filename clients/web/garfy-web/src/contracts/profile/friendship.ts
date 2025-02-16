import Profile from "./profile";

export interface Friendship {
  id: string;
  requesterProfileId: string;
  receiverProfileId: string;
  requesterProfile: Profile;
  receiverProfile: Profile;
  createdDate: Date;
  friendshipState: FriendshipState;
}

export enum FriendshipState {
  Pending,
  Accepted,
  Rejected,
}
