"use client";

import { useState } from "react";

import {
  GuestList,
} from "./guest-list";

import {
  AddGuestDialog,
} from "./add-guest-dialog";

import {
  getGuestsByWedding,
} from "../services/guest.service";

interface WeddingGuestsProps {
  weddingId: string;
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
  }>;
}

export function WeddingGuests({
  weddingId,
  guests: initialGuests,
}: WeddingGuestsProps) {

  const [guests, setGuests] =
    useState(initialGuests);

  async function refreshGuests() {

    const updatedGuests =
      await getGuestsByWedding(
        weddingId
      );

    setGuests(updatedGuests);

  }

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

        <AddGuestDialog
          weddingId={weddingId}
          onSuccess={refreshGuests}
        />

      </div>

      <GuestList
        weddingId={weddingId}
        guests={guests}
        onRefresh={refreshGuests}
      />

    </div>
  );
}