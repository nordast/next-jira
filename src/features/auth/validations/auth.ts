import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, "Required").max(255),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Required").max(255),
  email: z.string().email(),
  password: z.string().trim().min(8).max(255),
});
