"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import {
  Inbox,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  EmptyState,
} from "@/components/common/empty-state";

import {
  Button,
} from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DataTableToolbar,
} from "./data-table-toolbar";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  categories?: string[];
  categoryFilter?: string;
  onCategoryChange?: (
    value: string
  ) => void;
}


export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  emptyTitle = "No records found",
  emptyDescription = "Nothing to display.",
  categories = [],
  categoryFilter = "",
  onCategoryChange,
}: DataTableProps<TData, TValue>) {

  const [
    sorting,
    setSorting,
  ] = useState<SortingState>([]);


  const [
    search,
    setSearch,
  ] = useState("");


  const filteredData =
    useMemo(
      () => {

        if (!categoryFilter) {
          return data;
        }

        return data.filter(
          (item: any) =>
            item.category === categoryFilter
        );

      },
      [
        data,
        categoryFilter,
      ]
    );


  const table =
    useReactTable({

      data:
        filteredData,

      columns,

      state: {
        sorting,
        globalFilter: search,
      },

      onSortingChange:
        setSorting,

      onGlobalFilterChange:
        setSearch,

      getCoreRowModel:
        getCoreRowModel(),

      getSortedRowModel:
        getSortedRowModel(),

      getFilteredRowModel:
        getFilteredRowModel(),

      getPaginationRowModel:
        getPaginationRowModel(),

    });


  if (loading) {

    return (
      <div
        className="
          rounded-2xl
          border
          border-amber-100
          workspace-card
          p-6
          shadow-sm
        "
      >
        Loading...
      </div>
    );

  }


  return (
    <div className="space-y-4">

      <DataTableToolbar
        search={
          search
        }
        onSearchChange={
          setSearch
        }
        categories={
          categories
        }
        categoryFilter={
          categoryFilter
        }
        onCategoryChange={
          onCategoryChange
        }
      />


      {
        !table.getRowModel().rows.length ? (

          <EmptyState
            icon={
              Inbox
            }
            title={
              emptyTitle
            }
            description={
              emptyDescription
            }
          />

        ) : (

          <>

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-amber-100
                workspace-card
                shadow-sm
              "
            >

              <Table>

                <TableHeader
                  className="
                    bg-gradient-to-r
                    from-[#fff8e7]
                    via-amber-50
                    to-[#fffdf8]
                  "
                >

                  {
                    table.getHeaderGroups().map(
                      (
                        group
                      ) => (

                        <TableRow
                          key={
                            group.id
                          }
                          className="
                            border-b
                            border-amber-100
                          "
                        >

                          {
                            group.headers.map(
                              (
                                header
                              ) => (

                                <TableHead
                                  key={
                                    header.id
                                  }
                                  className="
                                    px-6
                                    py-4
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-stone-600
                                  "
                                >

                                  {
                                    header.isPlaceholder
                                      ? null
                                      :
                                      flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )
                                  }

                                </TableHead>

                              )
                            )
                          }

                        </TableRow>

                      )
                    )
                  }

                </TableHeader>


                <TableBody>

                  {
                    table.getRowModel().rows.map(
                      (
                        row
                      ) => (

                        <TableRow
                          key={
                            row.id
                          }
                          className="
                            border-b
                            border-amber-50
                            transition-colors
                            hover:bg-amber-50/40
                          "
                        >

                          {
                            row.getVisibleCells().map(
                              (
                                cell
                              ) => (

                                <TableCell
                                  key={
                                    cell.id
                                  }
                                  className="
                                    px-6
                                    py-5
                                    text-stone-700
                                  "
                                >

                                  {
                                    flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )
                                  }

                                </TableCell>

                              )
                            )
                          }

                        </TableRow>

                      )
                    )
                  }

                </TableBody>


              </Table>

            </div>


            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-stone-500">

                Showing {
                  table.getRowModel().rows.length
                } of {
                  table.getPrePaginationRowModel().rows.length
                }

              </p>


              <div className="flex gap-2">

                <Button
                  size="sm"
                  variant="outline"
                  disabled={
                    !table.getCanPreviousPage()
                  }
                  onClick={
                    () => table.previousPage()
                  }
                  className="
                    border-amber-200
                    bg-amber-50
                    text-amber-700
                    hover:bg-amber-100
                  "
                >
                  Previous
                </Button>


                <Button
                  size="sm"
                  variant="outline"
                  disabled={
                    !table.getCanNextPage()
                  }
                  onClick={
                    () => table.nextPage()
                  }
                  className="
                    border-amber-200
                    bg-amber-50
                    text-amber-700
                    hover:bg-amber-100
                  "
                >
                  Next
                </Button>

              </div>

            </div>

          </>

        )
      }

    </div>
  );
}