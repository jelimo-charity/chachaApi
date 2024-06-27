// src/validators/index.ts
import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z.number().min(1, "Year is required"),
});
