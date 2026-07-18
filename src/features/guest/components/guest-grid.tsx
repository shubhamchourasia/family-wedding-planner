import { GuestCard } from "./guest-card";

interface GuestGridProps {
  guests: Array<{
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    side: string;
    food: string | null;
    relation: string | null;
    city: string | null;
  }>;
}

export function GuestGrid({
  guests,
}: GuestGridProps) {
  if (guests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-xl font-semibold">
          No Guests Yet
        </h3>

        <p className="mt-2 text-gray-500">
          Start adding your wedding guests.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {guests.map((guest) => (
        <GuestCard
          key={guest.id}
          guest={guest}
        />
      ))}
    </div>
  );
}