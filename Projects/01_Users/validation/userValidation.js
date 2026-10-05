import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
});

export const patchUserSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field is required",
  });

export const userQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sort: z.enum(["name", "email", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export const userIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
});
