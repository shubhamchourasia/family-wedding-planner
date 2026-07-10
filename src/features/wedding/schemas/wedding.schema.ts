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


  startDate: z.coerce.date({
    error: "Invalid wedding start date",
  }),


  endDate: z
    .coerce.date({
      error: "Invalid wedding end date",
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


// Raw form input type
// Used by React Hook Form
export type WeddingFormInput =
  z.input<typeof weddingSchema>;


// Validated output type
// Used by service + Prisma
export type WeddingInput =
  z.output<typeof weddingSchema>;