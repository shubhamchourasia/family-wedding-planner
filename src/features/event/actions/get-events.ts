"use server";

import {
  getEventsByWedding,
} from "../services/event.service";


export async function getEventsAction(
  weddingId: string
) {

  try {

    const events =
      await getEventsByWedding(
        weddingId
      );

    return {
      success: true,
      data: events,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: "Unable to fetch events.",
    };

  }

}