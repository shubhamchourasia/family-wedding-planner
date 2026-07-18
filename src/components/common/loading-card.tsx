"use client";

import {
  Skeleton,
} from "@/components/ui/skeleton";

interface LoadingCardProps {
  rows?: number;
}

export function LoadingCard({
  rows = 4,
}: LoadingCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <Skeleton className="mb-6 h-7 w-56" />

      <div className="space-y-4">

        {Array.from({
          length: rows,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-12 w-full"
          />
        ))}

      </div>

    </div>
  );
}