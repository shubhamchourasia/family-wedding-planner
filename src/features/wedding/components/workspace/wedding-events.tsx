import { CreateEventDialog } from "@/features/event/components/create-event-dialog";
import { EventGrid } from "@/features/event/components/event-grid";

interface WeddingEventsProps {
  wedding: {
    id: string;
    events: Array<{
      id: string;
      title: string;
      type: string;
      venue: string | null;
      description: string | null;
      startTime: Date;
      endTime: Date | null;
    }>;
  };
}

export function WeddingEvents({
  wedding,
}: WeddingEventsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Events
        </h2>

        <CreateEventDialog weddingId={wedding.id} />
      </div>

      <EventGrid
        weddingId={wedding.id}
        events={wedding.events}
      />
    </div>
  );
}