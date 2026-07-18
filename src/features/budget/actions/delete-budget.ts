"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  deleteBudgetItem,
} from "../services/budget.service";

export async function deleteBudgetAction(
  id: string,
  weddingId: string
) {
  try {

    await deleteBudgetItem(id);

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
      error:
        "Failed to delete budget item.",
    };

  }
}