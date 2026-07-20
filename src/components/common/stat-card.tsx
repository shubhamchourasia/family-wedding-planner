"use client";

import {
  LucideIcon,
} from "lucide-react";


interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
}


export function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-amber-700",
  subtitle,
}: StatCardProps) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-amber-100
        workspace-card
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-stone-500
            "
          >
            {title}
          </p>


          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-stone-900
            "
          >
            ₹{value.toLocaleString("en-IN")}
          </p>


          {subtitle && (
            <p
              className="
                mt-1
                text-xs
                font-medium
                text-stone-500
              "
            >
              {subtitle}
            </p>
          )}

        </div>


        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-amber-50
          "
        >

          <Icon
            className={`h-6 w-6 ${color}`}
          />

        </div>


      </div>

    </div>
  );
}