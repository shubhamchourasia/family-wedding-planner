import {
  prisma,
} from "@/lib/prisma";

import type {
  WeddingInput,
} from "../schemas/wedding.schema";



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



export async function updateWedding(
  id: string,
  data: WeddingInput
) {

  return prisma.wedding.update({

    where: {

      id,

    },

    data: {

      title: data.title,

      brideName: data.brideName,

      groomName: data.groomName,

      startDate: data.startDate,

      location: data.location,

      description: data.description,

    },

  });

}



export async function getWeddingOverview(
  id: string
) {

  return prisma.wedding.findUnique({

    where: {

      id,

    },

    select: {

      id: true,

      title: true,

      brideName: true,

      groomName: true,

      location: true,

      startDate: true,

      description: true,

      overallBudget: true,

    },

  });

}