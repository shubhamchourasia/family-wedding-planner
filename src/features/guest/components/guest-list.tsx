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
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-xl font-semibold">
          No Guests Added
        </h3>

        <p className="mt-2 text-gray-500">
          Add your first wedding guest.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Side
            </th>

            <th className="p-4 text-left">
              Food
            </th>

            <th className="p-4 text-left">
              City
            </th>

            <th className="p-4 text-left">
              Events
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">
                <div className="font-medium">
                  {guest.fullName}
                </div>

                <div className="text-sm text-gray-500">
                  {guest.relation || "-"}
                </div>
              </td>

              <td className="p-4">
                {guest.phone || "-"}
              </td>

              <td className="p-4">
                {guest.side}
              </td>

              <td className="p-4">
                {guest.food || "-"}
              </td>

              <td className="p-4">
                {guest.city || "-"}
              </td>

              <td className="p-4">
                {guest.events &&
                guest.events.length > 0
                  ? guest.events
                      .map(
                        (guestEvent) =>
                          guestEvent.event.title
                      )
                      .join(", ")
                  : "-"}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
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