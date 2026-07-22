"use server";

import {
  getWeddingBudget,
} from "../services/wedding-budget.service";


export async function getWeddingBudgetAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingBudget(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding budget failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding budget",
    };

  }

}