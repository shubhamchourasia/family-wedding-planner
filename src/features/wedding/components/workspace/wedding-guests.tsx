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

    }, [
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

      <div className="rounded-xl border bg-white p-4 shadow-sm">

        <div className="flex flex-wrap items-center gap-4">

          <div className="relative flex-1 min-w-[260px]">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-gray-400
              "
            />

            <Input
              placeholder="Search guests..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="pl-10"
            />

          </div>

          <div className="flex items-center gap-2">

            <CalendarDays className="h-4 w-4 text-gray-500" />

            <Select
              value={selectedEvent}
              onValueChange={(value) =>
                setSelectedEvent(
                  value ?? "ALL"
                )
              }
            >

              <SelectTrigger className="w-56">
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

          </div>

          <div className="flex items-center gap-2">

            <Users className="h-4 w-4 text-gray-500" />

            <Select
              value={selectedSide}
              onValueChange={(value) =>
                setSelectedSide(
                  value ?? "ALL"
                )
              }
            >

              <SelectTrigger className="w-44">
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

          <div className="ml-auto rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">

            Showing{" "}
            <span className="font-semibold">
              {filteredGuests.length}
            </span>
            {" "}of{" "}
            <span className="font-semibold">
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