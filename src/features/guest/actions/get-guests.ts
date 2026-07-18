"use server";

import {
  prisma,
} from "@/lib/prisma";

export async function getGuestsAction(
  weddingId: string
) {
  return await prisma.guest.findMany({
    where: {
      weddingId,
    },
    orderBy: {
      fullName: "asc",
    },
  });
}