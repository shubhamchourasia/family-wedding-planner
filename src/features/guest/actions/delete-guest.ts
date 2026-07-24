"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function deleteGuestAction(
  guestId: string
) {

  try {

    const guest =
      await prisma.guest.findUnique({
        where: {
          id: guestId,
        },
        select: {
          weddingId: true,
        },
      });


    if (!guest) {

      return {
        success: true,
      };

    }


    await prisma.$transaction([

      prisma.guestEvent.deleteMany({
        where: {
          guestId,
        },
      }),


      prisma.guest.delete({
        where: {
          id: guestId,
        },
      }),

    ]);


    revalidatePath(
      `/weddings/${guest.weddingId}`
    );


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