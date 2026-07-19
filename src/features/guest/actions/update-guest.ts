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

    const {
      eventIds = [],
      ...guestData
    } = parsed.data;

    await prisma.guest.update({

      where: {
        id: guestId,
      },

      data: {

        ...guestData,

        events: {

          deleteMany: {},

          create: eventIds.map(
            (eventId) => ({
              eventId,
            })
          ),

        },

      },

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