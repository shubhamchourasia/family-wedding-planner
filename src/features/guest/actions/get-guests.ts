"use server";

import {
  prisma,
} from "@/lib/prisma";


export async function getGuestsAction(
  weddingId: string
) {

  const guests =
    await prisma.guest.findMany({

      where: {
        weddingId,
      },

      include: {
        events: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },

      orderBy: {
        fullName: "asc",
      },

    });


  return guests;

}