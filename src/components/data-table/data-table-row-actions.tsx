"use client";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: TData;

  onEdit?: (
    row: TData
  ) => void;

  onDelete?: (
    row: TData
  ) => void;
}

export function DataTableRowActions<
  TData,
>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<
  TData
>) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <MoreHorizontal className="h-4 w-4" />

          <span className="sr-only">
            Open menu
          </span>

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
      >

        {onEdit && (
          <DropdownMenuItem
            onClick={() =>
              onEdit(row)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />

            Edit

          </DropdownMenuItem>
        )}

        {onEdit &&
          onDelete && (
            <DropdownMenuSeparator />
          )}

        {onDelete && (
          <DropdownMenuItem
            variant="destructive"
            onClick={() =>
              onDelete(row)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />

            Delete

          </DropdownMenuItem>
        )}

      </DropdownMenuContent>

    </DropdownMenu>
  );
}