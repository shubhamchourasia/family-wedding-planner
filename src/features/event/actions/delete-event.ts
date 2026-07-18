"use server";

import { revalidatePath } from "next/cache";

import {
  deleteEvent,
} from "../services/event.service";

export async function deleteEventAction(
  eventId: string,
  weddingId: string
) {
  await deleteEvent(eventId);

  revalidatePath(
    `/weddings/${weddingId}`
  );

  return {
    success: true,
  };
}