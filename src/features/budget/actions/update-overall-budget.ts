"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  updateOverallBudget,
} from "../services/budget.service";


export async function updateOverallBudgetAction(
  weddingId: string,
  overallBudget: number
) {

  try {

    await updateOverallBudget(
      weddingId,
      overallBudget
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
      error:
        "Failed to update overall budget.",
    };

  }

}