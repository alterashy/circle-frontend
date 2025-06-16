export type FollowResponseDTO = {
  message: string;
  data: {
    id: string;
    followerId: string;
    followingId: string;
    createdAt: string;
    updatedAt: string;
  };
};
