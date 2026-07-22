"use server";

import {
  getWeddingVendors,
} from "../services/wedding-vendors.service";


export async function getWeddingVendorsAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingVendors(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding vendors failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding vendors",
    };

  }

}