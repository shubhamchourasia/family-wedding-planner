import { prisma } from "@/lib/prisma";

import type {
  EventInput,
} from "../schemas/event.schema";

export async function createEvent(
  weddingId: string,
  data: EventInput
) {
  return prisma.event.create({
    data: {
      weddingId,
      title: data.title,
      type: data.type,
      venue: data.venue || null,
      description: data.description || null,
      startTime: new Date(data.startTime),
      endTime: data.endTime
        ? new Date(data.endTime)
        : null,
    },
  });
}

export async function updateEvent(
  eventId: string,
  data: EventInput
) {
  return prisma.event.update({
    where: {
      id: eventId,
    },

    data: {
      title: data.title,
      type: data.type,
      venue: data.venue,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });
}

export async function deleteEvent(
  eventId: string
) {
  return prisma.event.delete({
    where: {
      id: eventId,
    },
  });
}

export async function getEventsByWedding(
  weddingId: string
) {
  return prisma.event.findMany({
    where: {
      weddingId,
    },

    orderBy: {
      startTime: "asc",
    },
  });
}

export async function getEventById(
  eventId: string
) {
  return prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
}