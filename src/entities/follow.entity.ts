import { UserEntity } from "./user.entity";

export interface FollowEntity {
  id: string;
  follower: UserEntity;
  following: UserEntity;
  createdAt: string;
  updatedAt: string;
  isFollow: boolean;
}
