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
      <div className="rounded-xl border bg-white p-8">
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

            <div className="rounded-xl border">

              <Table>

                <TableHeader>

                  {
                    table.getHeaderGroups().map(
                      (
                        group
                      ) => (

                        <TableRow
                          key={
                            group.id
                          }
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

              <p className="text-sm text-muted-foreground">

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