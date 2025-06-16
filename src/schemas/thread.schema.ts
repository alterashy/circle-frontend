import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.instanceof(FileList).optional(),
});

export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;

export const updateThreadSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.instanceof(FileList).optional(),
});

export type UpdateThreadSchemaDTO = z.infer<typeof updateThreadSchema>;

export const deleteThreadSchema = z.object({
  threadId: z.string().uuid(),
});

export type DeleteThreadSchemaDTO = z.infer<typeof deleteThreadSchema>;
