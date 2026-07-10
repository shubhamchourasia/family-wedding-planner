"use server";


import { revalidatePath } from "next/cache";

import { weddingSchema } from "../schemas/wedding.schema";

import {
  createWedding,
} from "../services/wedding.service";



// Temporary until Supabase Auth is connected
async function getCurrentUserId() {
  return "development-user-id";
}



export async function createWeddingAction(
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



    const ownerId =
      await getCurrentUserId();



    const wedding =
      await createWedding(
        validatedData.data,
        ownerId
      );



    revalidatePath("/dashboard");



    return {
      success: true,
      data: wedding,
    };


  } catch (error) {

    console.error(
      "Create wedding failed",
      error
    );


    return {
      success: false,
      error: "Unable to create wedding",
    };

  }

}