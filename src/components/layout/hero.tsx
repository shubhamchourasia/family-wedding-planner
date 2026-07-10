import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  IndianRupee,
  Users,
  Building2,
} from "lucide-react";

const features = [
  {
    title: "Guest Lists",
    icon: Users,
  },
  {
    title: "Budget Tracker",
    icon: IndianRupee,
  },
  {
    title: "Events",
    icon: CalendarDays,
  },
  {
    title: "Accommodation",
    icon: Building2,
  },
];

export default function Hero() {
  return (
    <main>
      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-7xl">💍</p>

        <h1 className="max-w-4xl text-6xl font-bold leading-tight">
          Plan Your Family Wedding Beautifully
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          A modern wedding planner built for Indian families to manage guests,
          budgets, vendors, accommodation, transportation and every ceremony
          from one place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg">
            Create Wedding
          </Button>

          <Button
            size="lg"
            variant="outline"
          >
            View Weddings
          </Button>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Everything you need
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <item.icon className="mb-4 h-10 w-10 text-rose-700" />

              <h3 className="mb-3 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-600">
                Easily organize and manage your wedding planning.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}