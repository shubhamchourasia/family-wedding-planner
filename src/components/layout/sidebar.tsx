"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}

      <div className="flex h-20 items-center justify-between border-b px-5">
      <Link
  href="/"
  className="flex items-center gap-3 overflow-hidden hover:opacity-80 transition-opacity"
>
  <Heart className="h-8 w-8 fill-rose-700 text-rose-700 shrink-0" />

  {!collapsed && (
    <div>
      <h2 className="font-bold text-lg leading-none">
        Wedding Planner
      </h2>

      <p className="text-xs text-gray-500">
        Family Workspace
      </p>
    </div>
  )}
</Link>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-xl px-4 py-3 transition-all duration-200",
                active
                  ? "bg-rose-700 text-white shadow"
                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />

              {!collapsed && (
                <span className="ml-3 font-medium">
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-700 text-lg font-bold text-white">
            S
          </div>

          {!collapsed && (
            <div>
              <p className="font-semibold">
                Shubham
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}