"use server";

import {
  getWeddingEvents,
} from "../services/wedding-events.service";


export async function getWeddingEventsAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingEvents(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding events failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding events",
    };

  }

}