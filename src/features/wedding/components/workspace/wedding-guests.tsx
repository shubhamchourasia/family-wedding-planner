"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Search,
  CalendarDays,
  Users,
} from "lucide-react";

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

import {
  Input,
} from "@/components/ui/input";


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
  ] = useState("ALL");


  const [
    selectedSide,
    setSelectedSide,
  ] = useState("ALL");


  const [
    search,
    setSearch,
  ] = useState("");


  async function refreshGuests() {

    const updatedGuests =
      await getGuestsAction(
        weddingId
      );

    setGuests(updatedGuests);

  }


  const filteredGuests =
    useMemo(() => {

      return guests.filter(
        (guest) => {

          const matchesEvent =
            selectedEvent === "ALL"
              ? true
              : guest.events?.some(
                  (guestEvent) =>
                    guestEvent.eventId === selectedEvent
                );


          const matchesSide =
            selectedSide === "ALL"
              ? true
              : selectedSide === "BRIDE"
                ? guest.side === "BRIDE" ||
                  guest.side === "BOTH"
                : selectedSide === "GROOM"
                  ? guest.side === "GROOM" ||
                    guest.side === "BOTH"
                  : guest.side === "BOTH";


          const keyword =
            search.toLowerCase();


          const matchesSearch =
            keyword.length === 0 ||
            guest.fullName
              .toLowerCase()
              .includes(keyword) ||
            guest.phone
              ?.toLowerCase()
              .includes(keyword) ||
            guest.city
              ?.toLowerCase()
              .includes(keyword) ||
            guest.relation
              ?.toLowerCase()
              .includes(keyword);


          return (
            matchesEvent &&
            matchesSide &&
            matchesSearch
          );

        }
      );


    },[
      guests,
      selectedEvent,
      selectedSide,
      search,
    ]);


  const selectedEventTitle =
    selectedEvent === "ALL"
      ? "All Events"
      : events.find(
          (event) =>
            event.id === selectedEvent
        )?.title ?? "All Events";


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div>
          <h2 className="pl-2 text-2xl font-semibold text-stone-900">
            Guest Management
          </h2>

          <p className="pl-2 text-gray-500">
            Manage wedding invitations and guest details.
          </p>
        </div>

        </div>


        <CreateGuestDialog
          weddingId={weddingId}
          events={events}
          onSuccess={refreshGuests}
        />

      </div>



      {/* Filters */}

      <div
        className="
          rounded-2xl
          border
          border-amber-100
          workspace-card
          p-5
          shadow-sm
        "
      >

        <div className="flex flex-wrap items-center gap-4">


          {/* Search */}

          <div className="relative min-w-[260px] flex-1">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-amber-600
              "
            />


            <Input
              placeholder="Search guests..."
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
              className="
                h-11
                rounded-xl
                border-amber-200
                bg-[#fffdf8]
                pl-10
                text-stone-700
                placeholder:text-stone-400
                focus-visible:ring-amber-300
              "
            />

          </div>



          {/* Event Filter */}

          <div className="flex items-center gap-2">

            <CalendarDays
              className="
                h-5
                w-5
                text-amber-700
              "
            />


            <Select
              value={selectedEvent}
              onValueChange={(value)=>
                setSelectedEvent(
                  value ?? "ALL"
                )
              }
            >

              <SelectTrigger
                className="
                  h-11
                  w-56
                  rounded-xl
                  border-amber-200
                  bg-[#fffdf8]
                  text-stone-700
                  focus:ring-amber-300
                "
              >

                <SelectValue>
                  {selectedEventTitle}
                </SelectValue>

              </SelectTrigger>


              <SelectContent>

                <SelectItem value="ALL">
                  All Events
                </SelectItem>


                {
                  events.map(
                    (event)=>(

                      <SelectItem
                        key={event.id}
                        value={event.id}
                      >
                        {event.title}
                      </SelectItem>

                    )
                  )
                }

              </SelectContent>


            </Select>


          </div>



          {/* Side Filter */}

          <div className="flex items-center gap-2">


            <Users
              className="
                h-5
                w-5
                text-amber-700
              "
            />


            <Select
              value={selectedSide}
              onValueChange={(value)=>
                setSelectedSide(
                  value ?? "ALL"
                )
              }
            >

              <SelectTrigger
                className="
                  h-11
                  w-44
                  rounded-xl
                  border-amber-200
                  bg-[#fffdf8]
                  text-stone-700
                  focus:ring-amber-300
                "
              >

                <SelectValue />

              </SelectTrigger>


              <SelectContent>

                <SelectItem value="ALL">
                  All Sides
                </SelectItem>

                <SelectItem value="BRIDE">
                  Bride
                </SelectItem>

                <SelectItem value="GROOM">
                  Groom
                </SelectItem>

                <SelectItem value="BOTH">
                  Both
                </SelectItem>

              </SelectContent>

            </Select>


          </div>



          {/* Count */}

          <div
            className="
              ml-auto
              rounded-full
              border
              border-amber-200
              bg-amber-50
              px-5
              py-2.5
              text-sm
              font-medium
              text-amber-800
            "
          >

            Showing{" "}
            <span className="font-bold">
              {filteredGuests.length}
            </span>

            {" "}of{" "}

            <span className="font-bold">
              {guests.length}
            </span>

          </div>


        </div>

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