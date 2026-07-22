"use client";

import { useRouter } from "next/navigation";

import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

import {
  EditWeddingDialog,
} from "./edit-wedding-dialog";

interface WeddingCardProps {
  wedding: {
    id: string;
    title: string;
    brideName: string;
    groomName: string;
    startDate: Date;
    location: string | null;
    description: string | null;
  };
}

export function WeddingCard({
  wedding,
}: WeddingCardProps) {

  const router = useRouter();

  return (

    <div
      onClick={() => router.push(`/weddings/${wedding.id}`)}
      className="
        relative
        cursor-pointer
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
      >

        <EditWeddingDialog
          wedding={wedding}
        />

      </div>

      <h3 className="pr-10 text-xl font-semibold">
        {wedding.title}
      </h3>

      <p className="mt-2 text-gray-600">
        💍 {wedding.brideName} & {wedding.groomName}
      </p>

      <div className="mt-5 space-y-3 text-sm text-gray-600">

        <div className="flex items-center gap-2">

          <CalendarDays className="h-4 w-4" />

          <span>
            {wedding.startDate.toLocaleDateString()}
          </span>

        </div>

        {wedding.location && (

          <div className="flex items-center gap-2">

            <MapPin className="h-4 w-4" />

            <span>
              {wedding.location}
            </span>

          </div>

        )}

        <div className="flex items-center gap-2">

          <Users className="h-4 w-4" />

          <span>
            Manage Wedding
          </span>

        </div>

      </div>

    </div>

  );

}