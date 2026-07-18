"use server";

import { revalidatePath } from "next/cache";

import {
  createGuest,
} from "../services/guest.service";

import {
  GuestInput,
} from "../schemas/guest.schema";

export async function createGuestAction(
  weddingId: string,
  values: GuestInput
) {
  try {

    await createGuest(
      weddingId,
      values
    );

    revalidatePath(
      `/weddings/${weddingId}`
    );

    return {
      success: true,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: "Unable to create guest",
    };

  }
}