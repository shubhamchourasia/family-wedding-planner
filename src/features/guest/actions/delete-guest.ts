"use server";

import { prisma } from "@/lib/prisma";


export async function deleteGuestAction(
  guestId: string
) {

  try {

    await prisma.guest.delete({

      where: {
        id: guestId,
      },

    });


    return {
      success: true,
    };


  } catch (error) {

    console.error(
      "Delete guest error:",
      error
    );


    return {
      success: false,
      error: "Failed to delete guest",
    };

  }

}