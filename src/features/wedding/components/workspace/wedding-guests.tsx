"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  GuestList,
} from "@/features/guest/components/guest-list";

import {
  CreateGuestDialog,
} from "@/features/guest/components/create-guest-dialog";

import {
  getGuestsAction,
} from "@/features/guest/actions/get-guests";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface WeddingGuestsProps {
  weddingId: string;

  events: Array<{
    id: string;
    title: string;
  }>;

  guests: Array<{
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    side: string;
    food: string | null;
    relation: string | null;
    city: string | null;
    accommodationRequired: boolean;
    transportRequired: boolean;
    notes: string | null;

    events?: Array<{
      eventId: string;
      event: {
        id: string;
        title: string;
      };
    }>;
  }>;
}


export function WeddingGuests({
  weddingId,
  events,
  guests: initialGuests,
}: WeddingGuestsProps) {

  const [
    guests,
    setGuests,
  ] = useState(initialGuests);


  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState<string>("ALL");


  async function refreshGuests() {

  const updatedGuests =
    await getGuestsAction(
      weddingId
    );
  setGuests([
    ...updatedGuests,
  ]);

}


  const filteredGuests =
    useMemo(() => {

      if (
        selectedEvent === "ALL"
      ) {
        return guests;
      }


      return guests.filter(
        (guest) =>
          guest.events?.some(
            (guestEvent) =>
              guestEvent.eventId === selectedEvent
          )
      );

    }, [
      guests,
      selectedEvent,
    ]);


  const selectedEventTitle =
    selectedEvent === "ALL"
      ? "All Events"
      : events.find(
          (event) =>
            event.id === selectedEvent
        )?.title ?? "Select Event";


  return (
    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-semibold">
            Guests
          </h2>

          <p className="text-gray-500">
            Manage wedding invitations and guest details.
          </p>
        </div>


        <CreateGuestDialog
          weddingId={weddingId}
          events={events}
          onSuccess={refreshGuests}
        />

      </div>


      <div className="flex items-center gap-4">

        <Select
          value={selectedEvent}
          onValueChange={(value) => {
            setSelectedEvent(
              value ?? "ALL"
            );
          }}
        >

          <SelectTrigger className="w-64">

            <SelectValue>
              {selectedEventTitle}
            </SelectValue>

          </SelectTrigger>


          <SelectContent>

            <SelectItem value="ALL">
              All Events
            </SelectItem>


            {events.map(
              (event) => (

                <SelectItem
                  key={event.id}
                  value={event.id}
                >
                  {event.title}
                </SelectItem>

              )
            )}

          </SelectContent>

        </Select>


        <span className="text-sm text-gray-500">

          Showing{" "}
          <b>
            {filteredGuests.length}
          </b>
          {" "}of{" "}
          <b>
            {guests.length}
          </b>

        </span>

      </div>


      <GuestList
        weddingId={weddingId}
        events={events}
        guests={filteredGuests}
        onRefresh={refreshGuests}
      />


    </div>
  );
}