import { z } from "zod";

export const createReplySchema = z.object({
  content: z.string().min(1).max(1000),
});

export type CreateReplySchemaDTO = z.infer<typeof createReplySchema>;

export const updateReplySchema = z.object({
  content: z.string().min(1).max(1000),
});

export type UpdateReplySchemaDTO = z.infer<typeof updateReplySchema>;

export const deleteReplySchema = z.object({
  replyId: z.string().uuid(),
});

export type DeleteReplySchemaDTO = z.infer<typeof deleteReplySchema>;
