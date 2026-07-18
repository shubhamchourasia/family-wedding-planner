"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  budgetSchema,
} from "../schemas/budget.schema";

import {
  updateBudgetItem,
} from "../services/budget.service";

export async function updateBudgetAction(
  id: string,
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

    await updateBudgetItem(
      id,
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
      error: "Failed to update budget item.",
    };

  }
}