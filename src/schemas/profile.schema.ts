import { z } from "zod";

export const UpdateProfileSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  username: z.string().trim().toLowerCase().min(4).max(12),
  bio: z.string().trim().max(100),
  avatarUrl: z.instanceof(FileList).optional(),
  bannerUrl: z.instanceof(FileList).optional(),
});

export type UpdateProfileSchemaDTO = z.infer<typeof UpdateProfileSchema>;
