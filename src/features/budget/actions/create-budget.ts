"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  budgetSchema,
} from "../schemas/budget.schema";

import {
  createBudgetItem,
} from "../services/budget.service";

export async function createBudgetAction(
  weddingId: string,
  values: unknown
) {
  const parsed =
    budgetSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  try {

    await createBudgetItem(
      weddingId,
      parsed.data
    );

    revalidatePath(
      `/weddings/${weddingId}`
    );

    return {
      success: true,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: "Failed to create budget item.",
    };

  }

}