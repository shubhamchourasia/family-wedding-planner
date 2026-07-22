import Link from "next/link";

import {
  CalendarDays,
  IndianRupee,
  Users,
  Building2,
} from "lucide-react";

import { CreateWeddingDialog } from "@/features/wedding/components/create-wedding-dialog";

import { Button } from "@/components/ui/button";


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
    <main className="bg-gradient-to-br from-amber-50 via-[#fff9ed] to-stone-50 pb-20">

      <section className="mx-auto flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-6 pt-16 pb-10 text-center">

        <p className="mb-4 text-7xl">
          💍
        </p>


        <h1 className="max-w-4xl text-6xl font-bold leading-tight text-amber-950">
          Wedding Planning, Simplified!
        </h1>


        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          A modern wedding planner built for Indian families to manage guests,
          budgets, vendors, accommodation, transportation and every ceremony
          from one place.
        </p>


        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <CreateWeddingDialog />

          <Link href="/dashboard">

            <Button
              size="lg"
              variant="outline"
              className="
                rounded-full
                border-amber-300
                bg-amber-50
                px-8
                text-amber-800
                hover:bg-amber-100
                hover:text-amber-900
              "
            >
              View Weddings
            </Button>

          </Link>

        </div>

      </section>


      <section className="mx-auto max-w-7xl px-6 pb-20">

        <h2 className="mb-8 text-center text-4xl font-bold text-amber-950">
          Everything you need
        </h2>


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (

            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-amber-100
                bg-[#fffdf8]
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <item.icon className="mb-4 h-10 w-10 text-amber-700" />


              <h3 className="mb-3 text-xl font-semibold text-stone-800">
                {item.title}
              </h3>


              <p className="text-stone-600">
                Easily organize and manage your wedding planning.
              </p>


            </div>

          ))}

        </div>

      </section>

    </main>
  );
}