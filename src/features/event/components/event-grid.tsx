import { EventCard } from "./event-card";

interface EventGridProps {
  weddingId: string;

  events: Array<{
    id: string;
    title: string;
    type: string;
    venue: string | null;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
  }>;
}

export function EventGrid({
  weddingId,
  events,
}: EventGridProps) {
  if (events.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          p-10
          text-center
        "
      >
        <h3 className="text-xl font-semibold">
          No Events Yet
        </h3>

        <p className="mt-2 text-gray-500">
          Create your first wedding event.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {events.map((event) => (
        <EventCard
          key={event.id}
          weddingId={weddingId}
          event={event}
        />
      ))}
    </div>
  );
}