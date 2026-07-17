"use server";

import { prisma } from "@/lib/prisma";

import {
  guestSchema,
} from "../schemas/guest.schema";


export async function updateGuestAction(
  guestId: string,
  data: unknown
) {

  const parsed =
    guestSchema.safeParse(data);


  if (!parsed.success) {

    return {
      success: false,
      error: "Invalid guest data",
    };

  }


  try {

    await prisma.guest.update({

      where: {
        id: guestId,
      },

      data: parsed.data,

    });


    return {
      success: true,
    };


  } catch (error) {

    console.error(
      "Update guest error:",
      error
    );


    return {
      success: false,
      error: "Failed to update guest",
    };

  }

}