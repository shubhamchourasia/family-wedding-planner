import { prisma } from "@/lib/prisma";

import {
  GuestInput,
} from "../schemas/guest.schema";

export async function createGuest(
  weddingId: string,
  data: GuestInput
) {
  const {
    eventIds = [],
    ...guestData
  } = data;

  return prisma.guest.create({
    data: {
      weddingId,

      fullName: guestData.fullName,

      phone: guestData.phone || null,

      email: guestData.email || null,

      side: guestData.side,

      food: guestData.food,

      relation: guestData.relation || null,

      city: guestData.city || null,

      notes: guestData.notes || null,

      events: {
        create: eventIds.map((eventId) => ({
          eventId,
        })),
      },
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

    include: {
      events: {
        include: {
          event: true,
        },
      },
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
  const {
    eventIds = [],
    ...guestData
  } = data;

  return prisma.guest.update({
    where: {
      id: guestId,
      weddingId,
    },

    data: {
      fullName: guestData.fullName,

      phone: guestData.phone || null,

      email: guestData.email || null,

      side: guestData.side,

      food: guestData.food,

      relation: guestData.relation || null,

      city: guestData.city || null,

      notes: guestData.notes || null,

      events: {
        deleteMany: {},

        create: eventIds.map((eventId) => ({
          eventId,
        })),
      },
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