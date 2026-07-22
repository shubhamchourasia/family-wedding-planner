import { prisma } from "@/lib/prisma";

export async function getWeddingGuests(
  id: string
) {
  return prisma.guest.findMany({
    where: {
      weddingId: id,
    },
    orderBy: {
      fullName: "asc",
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
  });
}