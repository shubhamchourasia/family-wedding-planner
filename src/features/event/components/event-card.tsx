import {
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import { EditEventDialog } from "./edit-event-dialog";
import { DeleteEventDialog } from "./delete-event-dialog";

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
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date(date));
}

export function EventCard({
  weddingId,
  event,
}: EventCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold">
            {event.title}
          </h3>

          <span className="mt-2 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
            {event.type.replace("_", " ")}
          </span>

        </div>

        <div className="flex gap-2">

          <EditEventDialog
            weddingId={weddingId}
            event={event}
          />

          <DeleteEventDialog
            weddingId={weddingId}
            eventId={event.id}
          />

        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-gray-600">

          <CalendarDays className="h-4 w-4 text-rose-600" />

          <span>{formatDate(event.startTime)}</span>

        </div>

        <div className="flex items-center gap-3 text-gray-600">

          <Clock3 className="h-4 w-4 text-rose-600" />

          <span>{formatTime(event.startTime)}</span>

        </div>

        {event.venue && (
          <div className="flex items-center gap-3 text-gray-600">

            <MapPin className="h-4 w-4 text-rose-600" />

            <span>{event.venue}</span>

          </div>
        )}

      </div>

      {event.description && (
        <div className="mt-6 border-t pt-4">

          <p className="text-sm leading-6 text-gray-600">
            {event.description}
          </p>

        </div>
      )}

    </div>
  );
}