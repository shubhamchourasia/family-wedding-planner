"use client";

import type {
  LucideIcon,
} from "lucide-react";

import {
  Currency,
} from "./currency";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
  isCurrency?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-600",
  subtitle,
  isCurrency = true,
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <div className="mt-2 text-2xl font-bold">

            {isCurrency ? (
              <Currency value={value} />
            ) : (
              value.toLocaleString("en-IN")
            )}

          </div>

          {subtitle && (
            <p className="mt-2 text-xs text-gray-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`rounded-lg bg-gray-100 p-3 ${color}`}
        >
          <Icon className="h-6 w-6" />
        </div>

      </div>

    </div>
  );
}