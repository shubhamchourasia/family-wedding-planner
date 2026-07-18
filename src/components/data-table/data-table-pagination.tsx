"use client";

import type {
  Table,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<
  TData,
> {
  table: Table<TData>;
}

export function DataTablePagination<
  TData,
>({
  table,
}: DataTablePaginationProps<
  TData
>) {

  return (
    <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

      <div className="text-sm text-muted-foreground">

        Showing{" "}

        <span className="font-medium">
          {table.getRowModel().rows.length}
        </span>

        {" "}of{" "}

        <span className="font-medium">
          {
            table.getFilteredRowModel()
              .rows.length
          }
        </span>

        {" "}rows

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">

          <span className="text-sm">
            Rows
          </span>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) =>
              table.setPageSize(
                Number(value)
              )
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              {[10,20,30,40,50].map(
                (size) => (
                  <SelectItem
                    key={size}
                    value={`${size}`}
                  >
                    {size}
                  </SelectItem>
                )
              )}

            </SelectContent>

          </Select>

        </div>

        <div className="text-sm">

          Page{" "}

          <span className="font-medium">
            {table.getState().pagination.pageIndex + 1}
          </span>

          {" "}of{" "}

          <span className="font-medium">
            {table.getPageCount()}
          </span>

        </div>

        <div className="flex gap-1">

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              table.setPageIndex(0)
            }
            disabled={
              !table.getCanPreviousPage()
            }
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              table.previousPage()
            }
            disabled={
              !table.getCanPreviousPage()
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              table.nextPage()
            }
            disabled={
              !table.getCanNextPage()
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              table.setPageIndex(
                table.getPageCount() - 1
              )
            }
            disabled={
              !table.getCanNextPage()
            }
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>

        </div>

      </div>

    </div>
  );
}