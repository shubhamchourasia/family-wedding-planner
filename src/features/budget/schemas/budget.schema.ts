import {
  z,
} from "zod";

export const budgetSchema =
  z.object({
    description:
      z.string()
      .trim()
      .min(
        1,
        "Description is required"
      ),

    category:
      z.enum([
        "VENUE",
        "FOOD",
        "DECOR",
        "PHOTOGRAPHY",
        "HOTEL",
        "TRANSPORT",
        "GIFTS",
        "CLOTHES",
        "JEWELLERY",
        "OTHER",
      ]),

    estimated:
      z.coerce
      .number()
      .min(
        0,
        "Estimated amount must be positive"
      ),

    actual:
      z.coerce
      .number()
      .min(
        0
      )
      .optional()
      .nullable(),

    paid:
      z.coerce
      .number()
      .min(
        0
      )
      .optional()
      .nullable(),

    remarks:
      z.string()
      .optional()
      .nullable(),

    addedBy:
      z.enum([
        "SHUBHAM",
        "AAKRITI",
        "MUSKAN",
        "ANKITA",
        "SOURAV",
      ]),
  });

export type BudgetFormInput =
  z.input<
    typeof budgetSchema
  >;

export type BudgetInput =
  z.output<
    typeof budgetSchema
  >;