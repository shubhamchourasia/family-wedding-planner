"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Heart className="h-6 w-6 fill-rose-700 text-rose-700" />
          <span className="text-xl font-bold tracking-tight text-rose-900">
            Family Wedding Planner
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-rose-700"
          >
            About
          </Link>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-rose-200" />

          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-full px-6 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-800"
            >
              Login / Sign Up
            </Button>

          </Link>
        </div>
      </div>
    </header>
  );
}