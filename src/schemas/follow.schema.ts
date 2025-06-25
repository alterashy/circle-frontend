import { z } from "zod";

export const followSchema = z.object({
  followingId: z.string().uuid(),
});

export type FollowDTO = z.infer<typeof followSchema>;

export const unfollowSchema = z.object({
  followingId: z.string().uuid(),
});

export type UnfollowDTO = z.infer<typeof unfollowSchema>;
