"use client";

import { useState } from "react";

import {
  GuestList,
} from "@/features/guest/components/guest-list";

import {
  CreateGuestDialog,
} from "@/features/guest/components/create-guest-dialog";

import {
  getGuestsAction,
} from "@/features/guest/actions/get-guests";

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
      await getGuestsAction(
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

        <CreateGuestDialog
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