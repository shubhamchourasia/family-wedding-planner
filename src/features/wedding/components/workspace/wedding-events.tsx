import {
  CreateEventDialog,
} from "@/features/event/components/create-event-dialog";

import {
  EventGrid,
} from "@/features/event/components/event-grid";


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

  onRefresh?: () => void | Promise<void>;

}



export function WeddingEvents({

  wedding,

  onRefresh,

}: WeddingEventsProps) {


  return (

    <div className="space-y-6">


      <div
        className="
          flex
          items-center
          justify-between
        "
      >


        <div>


          <h2
            className="
              pl-2
              text-2xl
              font-semibold
              text-stone-900
            "
          >

            Event Management

          </h2>



          <p
            className="
              pl-2
              text-gray-500
            "
          >

            Manage events and schedules.

          </p>


        </div>




        <CreateEventDialog

          weddingId={
            wedding.id
          }

          onSuccess={
            onRefresh
          }

        />


      </div>





      <EventGrid

        weddingId={
          wedding.id
        }

        events={
          wedding.events
        }

        onRefresh={
          onRefresh
        }

      />


    </div>

  );

}