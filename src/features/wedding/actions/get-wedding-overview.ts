"use server";

import {
  getWeddingOverview,
} from "../services/wedding-overview.service";


export async function getWeddingOverviewAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingOverview(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding overview failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding overview",
    };

  }

}