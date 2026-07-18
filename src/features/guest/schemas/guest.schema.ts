import { z } from "zod";

export const guestSchema = z.object({
  fullName: z
    .string()
    .min(2, "Guest name is required"),

  phone: z
    .string()
    .optional(),

  email: z
    .string()
    .email("Invalid email")
    .or(z.literal(""))
    .optional(),

  side: z.enum([
    "BRIDE",
    "GROOM",
    "BOTH",
  ]),

  food: z.enum([
    "VEG",
    "NON_VEG",
    "JAIN",
    "VEGAN",
  ]).optional(),

  relation: z.string().optional(),

  city: z.string().optional(),

  notes: z.string().optional(),
});

export type GuestInput =
  z.input<typeof guestSchema>;

export type GuestFormInput =
  z.output<typeof guestSchema>;