"use server";

import { revalidatePath } from "next/cache";

import { weddingSchema } from "../schemas/wedding.schema";

import {
  updateWedding,
} from "../services/wedding.service";

export async function updateWeddingAction(
  weddingId: string,
  input: unknown
) {

  try {

    const validatedData =
      weddingSchema.safeParse(input);

    if (!validatedData.success) {

      return {
        success: false,
        error: validatedData.error.flatten(),
      };

    }

    const wedding =
      await updateWedding(
        weddingId,
        validatedData.data
      );

    revalidatePath("/dashboard");
    revalidatePath(`/weddings/${weddingId}`);

    return {
      success: true,
      data: wedding,
    };

  } catch (error) {

    console.error(
      "Update wedding failed",
      error
    );

    return {
      success: false,
      error: "Unable to update wedding",
    };

  }

}