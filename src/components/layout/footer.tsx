import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fffaf0]">

      {/* Top Divider */}
      <div className="mx-auto h-px w-full max-w-4xl bg-amber-200" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8">

        {/* Branding */}
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 fill-amber-600 text-amber-600" />

          <span className="text-sm font-medium text-stone-700">
            Crafted with love for our family
          </span>
        </div>


        {/* Copyright */}
        <p className="text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Family Wedding Planner
        </p>

      </div>

    </footer>
  );
}