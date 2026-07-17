import { prisma } from "@/lib/prisma";

import {
  GuestInput,
} from "../schemas/guest.schema";

export async function createGuest(
  weddingId: string,
  data: GuestInput
) {
  return prisma.guest.create({
    data: {
      weddingId,

      fullName: data.fullName,

      phone: data.phone || null,

      email: data.email || null,

      side: data.side,

      food: data.food,

      relation: data.relation || null,

      city: data.city || null,

      notes: data.notes || null,
    },
  });
}

export async function getGuestsByWedding(
  weddingId: string
) {
  return prisma.guest.findMany({
    where: {
      weddingId,
    },

    orderBy: {
      fullName: "asc",
    },
  });
}

export async function updateGuest(
  guestId: string,
  weddingId: string,
  data: GuestInput
) {
  return prisma.guest.update({
    where: {
      id: guestId,
      weddingId,
    },

    data: {
      fullName: data.fullName,

      phone: data.phone || null,

      email: data.email || null,

      side: data.side,

      food: data.food,

      relation: data.relation || null,

      city: data.city || null,

      notes: data.notes || null,
    },
  });
}

export async function deleteGuest(
  guestId: string
) {
  return prisma.guest.delete({
    where: {
      id: guestId,
    },
  });
}