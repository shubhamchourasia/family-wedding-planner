"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/60 bg-[#fff8e7]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Heart className="h-6 w-6 fill-amber-600 text-amber-600" />

          <span className="text-xl font-semibold tracking-tight text-amber-950">
            Family Wedding Planner
          </span>
        </Link>


        <div className="flex items-center gap-4">

          <Link
            href="/about"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-700"
          >
            About
          </Link>


          <div className="h-6 w-px bg-amber-200" />


          <Link href="/login">

            <Button
              variant="outline"
              className="
                rounded-full
                border-amber-300
                bg-gradient-to-r
                from-amber-50
                to-yellow-50
                px-6
                text-amber-800
                shadow-sm
                hover:border-amber-400
                hover:from-amber-100
                hover:to-yellow-100
                hover:text-amber-900
              "
            >
              Login / Sign Up
            </Button>

          </Link>

        </div>

      </div>
    </header>
  );
}