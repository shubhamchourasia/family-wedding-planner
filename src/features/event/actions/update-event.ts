"use server";

import { revalidatePath } from "next/cache";

import {
  eventSchema,
} from "../schemas/event.schema";

import {
  updateEvent,
} from "../services/event.service";

export async function updateEventAction(
  eventId: string,
  weddingId: string,
  input: unknown
) {
  const parsed =
    eventSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  await updateEvent(
    eventId,
    parsed.data
  );

  revalidatePath(
    `/weddings/${weddingId}`
  );

  return {
    success: true,
  };
}