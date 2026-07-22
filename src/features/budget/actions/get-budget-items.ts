"use server";

import {
  getBudgetItemsByWedding,
} from "../services/budget.service";


export async function getBudgetItemsAction(
  weddingId: string
) {

  try {

    const budgetItems =
      await getBudgetItemsByWedding(
        weddingId
      );


    return {
      success: true,
      data: budgetItems,
    };


  } catch (error) {

    console.error(
      "Failed to fetch budget items",
      error
    );


    return {
      success: false,
      error: "Unable to fetch budget items.",
    };

  }

}