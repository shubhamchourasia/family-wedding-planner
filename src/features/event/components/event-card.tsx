"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  EditEventDialog,
} from "./edit-event-dialog";

import {
  DeleteEventDialog,
} from "./delete-event-dialog";


interface EventCardProps {
  weddingId: string;

  event: {
    id: string;
    title: string;
    type: string;
    venue: string | null;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
  };

  onRefresh?: () => void | Promise<void>;
}


function formatDate(
  date: Date | string
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(new Date(date));
}


function formatTime(
  date: Date | string
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }
  ).format(new Date(date));
}


export function EventCard({
  weddingId,
  event,
  onRefresh,
}: EventCardProps) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-amber-100
        workspace-card
        p-5
        space-y-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-stone-900">
            {event.title}
          </h3>


          <span
            className="
              mt-2
              inline-flex
              rounded-full
              bg-amber-100
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-amber-700
            "
          >
            {event.type.replaceAll("_", " ")}
          </span>

        </div>



        <div className="flex gap-2">

          <EditEventDialog
            weddingId={weddingId}
            event={event}
            onSuccess={onRefresh}
          />

          <DeleteEventDialog
            weddingId={weddingId}
            eventId={event.id}
            onSuccess={onRefresh}
          />

        </div>

      </div>



      <div className="space-y-3">


        <div className="flex items-center gap-3 text-stone-600">

          <CalendarDays className="h-4 w-4 text-amber-700" />

          <span className="text-sm">
            {formatDate(event.startTime)}
          </span>

        </div>



        <div className="flex items-center gap-3 text-stone-600">

          <Clock3 className="h-4 w-4 text-amber-700" />

          <span className="text-sm">
            {formatTime(event.startTime)}
          </span>

        </div>



        {
          event.venue && (

            <div className="flex items-center gap-3 text-stone-600">

              <MapPin className="h-4 w-4 text-amber-700" />

              <span className="text-sm">
                {event.venue}
              </span>

            </div>

          )
        }


      </div>



      {
        event.description && (

          <div
            className="
              rounded-xl
              bg-amber-50/60
              p-3
              border
              border-amber-100
            "
          >

            <p className="text-sm leading-6 text-stone-600">
              {event.description}
            </p>

          </div>

        )
      }


    </div>
  );
}