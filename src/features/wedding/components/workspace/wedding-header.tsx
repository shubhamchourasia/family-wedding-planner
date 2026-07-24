import {
  CalendarDays,
  MapPin,
} from "lucide-react";

interface WeddingHeaderProps {
  wedding: {
    title: string;
    brideName: string;
    groomName: string;
    location: string | null;
    startDate: Date;
  };
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function WeddingHeader({
  wedding,
}: WeddingHeaderProps) {

  const dateRange = formatDate(wedding.startDate);

  return (
    <div className="rounded-2xl border border-amber-100 bg-[#fffdf8] p-8 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wider text-amber-700">
            Wedding
          </p>

          <h1 className="mt-2 text-4xl font-bold text-amber-950">
            {wedding.title}
          </h1>

          <p className="mt-2 text-lg text-stone-600">
            {wedding.brideName} ❤️ {wedding.groomName}
          </p>

        </div>


        <div className="space-y-3">

          {wedding.location && (
            <div className="flex items-center gap-2 text-stone-600">
              <MapPin className="h-5 w-5 text-amber-700" />
              <span>{wedding.location}</span>
            </div>
          )}


          <div className="flex items-center gap-2 text-stone-600">
            <CalendarDays className="h-5 w-5 text-amber-700" />
            <span>{dateRange}</span>
          </div>

        </div>

      </div>

    </div>
  );
}