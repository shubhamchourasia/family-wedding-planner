"use client";

import {
  Badge,
} from "@/components/ui/badge";

interface StatusBadgeProps {
  label: string;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";
}

const variants = {
  default:
    "bg-gray-100 text-gray-700 hover:bg-gray-100",
  success:
    "bg-green-100 text-green-700 hover:bg-green-100",
  warning:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  danger:
    "bg-red-100 text-red-700 hover:bg-red-100",
  info:
    "bg-blue-100 text-blue-700 hover:bg-blue-100",
};

export function StatusBadge({
  label,
  variant = "default",
}: StatusBadgeProps) {
  return (
    <Badge
      className={variants[variant]}
    >
      {label}
    </Badge>
  );
}