"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-700 fill-rose-700" />
          <span className="text-xl font-bold text-rose-900">
            Family Wedding Planner
          </span>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#" className="hover:text-rose-700">
            Home
          </a>

          <a href="#" className="hover:text-rose-700">
            Features
          </a>

          <a href="#" className="hover:text-rose-700">
            About
          </a>
        </nav>

        <Button>Admin Login</Button>
      </div>
    </header>
  );
}