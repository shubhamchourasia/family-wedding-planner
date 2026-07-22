"use server";

import {
  getWeddingGuests,
} from "../services/wedding-guests.service";


export async function getWeddingGuestsAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingGuests(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding guests failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding guests",
    };

  }

}