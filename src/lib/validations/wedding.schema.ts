import { z } from "zod";

export const weddingSchema = z.object({
  title: z
    .string()
    .min(3, "Wedding title must be at least 3 characters"),

  brideName: z
    .string()
    .min(2, "Bride name is required"),

  groomName: z
    .string()
    .min(2, "Groom name is required"),

  startDate: z
    .date({
      error: "Wedding start date is required",
    }),

  endDate: z
    .date({
      error: "Invalid end date",
    })
    .optional(),

  location: z
    .string()
    .optional(),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
});


export type WeddingInput = z.infer<typeof weddingSchema>;