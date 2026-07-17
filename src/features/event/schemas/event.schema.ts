import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Event name must be at least 2 characters")
    .max(100, "Event name is too long"),

  type: z.enum([
    "ENGAGEMENT",
    "HALDI",
    "MEHENDI",
    "SANGEET",
    "WEDDING",
    "RECEPTION",
    "COCKTAIL",
    "OTHER",
  ]),

  venue: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  startTime: z.coerce.date(),

  endTime: z.coerce.date().optional(),
});

export type EventInput = z.output<typeof eventSchema>;

export type EventFormInput = z.input<typeof eventSchema>;