import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
});

export const postIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Post ID"),
});

export const patchPostSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least one field is required",
  });
