import { z } from "zod";

export const createReplySchema = z.object({
  content: z.string().min(1).max(1000),
});

export type CreateReplySchemaDTO = z.infer<typeof createReplySchema>;
