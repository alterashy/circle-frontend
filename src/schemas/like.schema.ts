import { z } from "zod";

export const likeSchema = z.object({
  threadId: z.string().uuid(),
});

export type LikeDTO = z.infer<typeof likeSchema>;

export const unlikeSchema = z.object({
  threadId: z.string().uuid(),
});

export type UnlikeDTO = z.infer<typeof unlikeSchema>;
