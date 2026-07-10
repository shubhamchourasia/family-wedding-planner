import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import type { WeddingInput } from "../schemas/wedding.schema";


export async function createWedding(
  data: WeddingInput,
  ownerId: string
) {
  return prisma.wedding.create({
    data: {
      title: data.title,

      brideName: data.brideName,

      groomName: data.groomName,

      startDate: data.startDate,

      endDate: data.endDate,

      location: data.location,

      description: data.description,

      ownerId,
    },
  });
}


export async function getWeddings(
  ownerId: string
) {
  return prisma.wedding.findMany({
    where: {
      ownerId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}



const weddingDetailsArgs =
  Prisma.validator<Prisma.WeddingDefaultArgs>()({
    select: {
      id: true,

      title: true,

      brideName: true,

      groomName: true,

      startDate: true,

      endDate: true,

      location: true,

      description: true,


      guests: {
        select: {
          id: true,
          fullName: true,
        },
      },


      events: {
        select: {
          id: true,
          title: true,
          venue: true,
          startTime: true,
          endTime: true,
        },
      },


      vendors: {
        select: {
          id: true,
          name: true,
        },
      },


      budgets: {
        select: {
          id: true,
          title: true,
        },
      },


      tasks: {
        select: {
          id: true,
          title: true,
          completed: true,
        },
      },


      documents: {
        select: {
          id: true,
          title: true,
          fileUrl: true,
        },
      },


      families: {
        select: {
          id: true,
          familyName: true,
        },
      },
    },
  });



export type WeddingDetails =
  Prisma.WeddingGetPayload<
    typeof weddingDetailsArgs
  >;



export async function getWeddingById(
  weddingId: string
): Promise<WeddingDetails | null> {

  return prisma.wedding.findUnique({
    where: {
      id: weddingId,
    },

    ...weddingDetailsArgs,
  });

}