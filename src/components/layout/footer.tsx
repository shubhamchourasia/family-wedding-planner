import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10">
        <Heart className="h-6 w-6 fill-rose-700 text-rose-700" />

        <p className="text-center text-gray-500">
          Built with ❤️ for our family.
        </p>

        <p className="text-sm text-gray-400">
          Family Wedding Planner © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}