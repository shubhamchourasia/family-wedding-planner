import {
  Phone,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

interface GuestCardProps {
  guest: {
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    side: string;
    food: string | null;
    relation: string | null;
    city: string | null;
  };
}

export function GuestCard({
  guest,
}: GuestCardProps) {
  return (
    <div className="rounded-2xl border border-amber-100 workspace-card p-8 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            {guest.fullName}
          </h3>

          {guest.relation && (
            <p className="text-sm text-gray-500">
              {guest.relation}
            </p>
          )}

        </div>

        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
          {guest.side}
        </span>

      </div>

      <div className="mt-5 space-y-3 text-sm text-gray-600">

        {guest.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {guest.phone}
          </div>
        )}

        {guest.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {guest.email}
          </div>
        )}

        {guest.city && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {guest.city}
          </div>
        )}

        {guest.food && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {guest.food}
          </div>
        )}

      </div>

    </div>
  );
}