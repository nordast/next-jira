import { z } from "zod";

export const createProjectSchema = z.object({
  workspaceId: z.string(),
  name: z.string().trim().min(1, "Required").max(255),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Required").max(255).optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
