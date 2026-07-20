"use client";

import {
  EditGuestDialog,
} from "./edit-guest-dialog";

import {
  DeleteGuestDialog,
} from "./delete-guest-dialog";

interface GuestListProps {
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

  onRefresh?: () => void;
}

export function GuestList({
  weddingId,
  events,
  guests,
  onRefresh,
}: GuestListProps) {

  if (guests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-amber-200 p-10 text-center">
        <h3 className="text-xl font-semibold text-stone-800">
          No Guests Added
        </h3>

        <p className="mt-2 text-stone-500">
          Add your first wedding guest.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-100 workspace-card overflow-hidden shadow-sm">

      <table className="w-full">

        <thead className="border-b border-amber-200 bg-gradient-to-r from-[#fff8e7] via-amber-50 to-[#fffdf8]">

          <tr className="text-sm font-bold uppercase tracking-wide text-stone-600">

            <th className="px-6 py-4 text-left">
              Guest
            </th>

            <th className="px-6 py-4 text-left">
              Phone
            </th>

            <th className="px-6 py-4 text-left">
              Side
            </th>

            <th className="px-6 py-4 text-left">
              Food
            </th>

            <th className="px-6 py-4 text-left">
              City
            </th>

            <th className="px-6 py-4 text-left">
              Events
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>


        <tbody>

          {guests.map((guest) => (

            <tr
              key={guest.id}
              className="
                border-b
                border-amber-100/70
                transition-colors
                hover:bg-amber-50/50
              "
            >

              <td className="px-6 py-5">

                <div className="font-semibold text-stone-900">
                  {guest.fullName}
                </div>

                <div className="mt-1 text-sm text-stone-500">
                  {guest.relation || "No relation"}
                </div>

              </td>


              <td className="px-6 py-5 text-base text-stone-700">
                {guest.phone || "-"}
              </td>


              <td className="px-6 py-5">

                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-amber-100
                    bg-amber-50
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-amber-800
                  "
                >
                  {guest.side}
                </span>

              </td>


              <td className="px-6 py-5">

                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-emerald-700
                  "
                >
                  {guest.food || "-"}
                </span>

              </td>


              <td className="px-6 py-5 text-base text-stone-700">
                {guest.city || "-"}
              </td>


              <td className="px-6 py-5">

                <div className="flex flex-wrap gap-2">

                  {guest.events &&
                  guest.events.length > 0 ? (

                    guest.events.map(
                      (guestEvent) => (

                        <span
                          key={guestEvent.eventId}
                          className="
                            rounded-full
                            border
                            border-rose-100
                            bg-rose-50
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-rose-700
                          "
                        >
                          {guestEvent.event.title}
                        </span>

                      )
                    )

                  ) : (

                    <span className="text-stone-400">
                      -
                    </span>

                  )}

                </div>

              </td>


              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <EditGuestDialog
                    weddingId={weddingId}
                    events={events}
                    guest={guest}
                    onSuccess={onRefresh}
                  />


                  <DeleteGuestDialog
                    guestId={guest.id}
                    guestName={guest.fullName}
                    onSuccess={onRefresh}
                  />

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}