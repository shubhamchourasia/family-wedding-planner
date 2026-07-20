import {
  z,
} from "zod";


export const taskListSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        "Task list name is required"
      ),
  });


export const taskSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        1,
        "Task name is required"
      ),

    category: z.enum([
      "VENUE",
      "FOOD",
      "DECOR",
      "GUEST",
      "TRAVEL",
      "DOCUMENT",
      "PAYMENT",
      "OTHER",
      "GENERAL",
    ]),

    addedBy: z.enum([
      "SHUBHAM",
      "AAKRITI",
      "MUSKAN",
      "ANKITA",
      "SOURAV",
    ]),

    dueDate:
      z
        .date()
        .nullable()
        .optional(),

    remarks:
      z
        .string()
        .trim()
        .nullable()
        .optional(),
  });


export type TaskListInput =
  z.input<
    typeof taskListSchema
  >;


export type TaskInput =
  z.input<
    typeof taskSchema
  >;


export type TaskOutput =
  z.output<
    typeof taskSchema
  >;