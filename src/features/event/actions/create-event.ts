"use server";

import { revalidatePath } from "next/cache";

import { eventSchema } from "../schemas/event.schema";

import {
  createEvent,
} from "../services/event.service";


export async function createEventAction(
  weddingId: string,
  input: unknown
) {
  try {

    const validated =
      eventSchema.safeParse(input);


    if (!validated.success) {
      return {
        success: false,
        error: validated.error.flatten(),
      };
    }


    const event =
      await createEvent(
        weddingId,
        validated.data
      );


    revalidatePath(`/weddings/${weddingId}`);


    return {
      success: true,
      data: event,
    };

  } catch (error) {

    console.error(
      "Create Event Failed",
      error
    );

    return {
      success: false,
      error: "Unable to create event.",
    };

  }
}