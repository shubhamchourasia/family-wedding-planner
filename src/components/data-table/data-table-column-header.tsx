"use client";

import type {
  Column,
} from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> {
  column: Column<
    TData,
    TValue
  >;
  title: string;
}

export function DataTableColumnHeader<
  TData,
  TValue,
>({
  column,
  title,
}: DataTableColumnHeaderProps<
  TData,
  TValue
>) {

  const sorted =
    column.getIsSorted();

  function renderIcon() {
    if (sorted === "asc") {
      return (
        <ArrowUp className="ml-2 h-4 w-4" />
      );
    }

    if (sorted === "desc") {
      return (
        <ArrowDown className="ml-2 h-4 w-4" />
      );
    }

    return (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="-ml-3 h-8 px-3 font-semibold hover:bg-transparent"
      onClick={() =>
        column.toggleSorting(
          sorted === "asc"
        )
      }
    >
      {title}

      {renderIcon()}

    </Button>
  );
}