"use client";

import type {
  LucideIcon,
} from "lucide-react";

import {
  Inbox,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/common/empty-state";

interface DataTableEmptyProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export function DataTableEmpty({
  title = "No records found",
  description = "There are no records to display.",
  icon = Inbox,
}: DataTableEmptyProps) {
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
    />
  );
}