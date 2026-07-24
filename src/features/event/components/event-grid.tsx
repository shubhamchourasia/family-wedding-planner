"use client";

import {
  EventCard,
} from "./event-card";


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

  onRefresh?: () => void | Promise<void>;

}



export function EventGrid({

  weddingId,

  events,

  onRefresh,

}: EventGridProps) {


  if(events.length === 0) {

    return (

      <div
        className="
          rounded-2xl
          border
          border-amber-100
          workspace-card
          p-10
          text-center
          text-gray-500
        "
      >

        No events added yet.

      </div>

    );

  }



  return (

    <div
      className="
        grid
        gap-5
        md:grid-cols-2
        lg:grid-cols-3
      "
    >

      {
        events.map(
          (event) => (

            <EventCard

              key={
                event.id
              }

              weddingId={
                weddingId
              }

              event={
                event
              }

              onRefresh={
                onRefresh
              }

            />

          )
        )
      }

    </div>

  );

}