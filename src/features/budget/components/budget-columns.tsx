"use client";

import {
  useState,
} from "react";

import type {
  ColumnDef,
} from "@tanstack/react-table";

import {
  BudgetCategory,
} from "@prisma/client";

import {
  DataTableColumnHeader,
} from "@/components/data-table/data-table-column-header";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  EditBudgetDialog,
} from "./edit-budget-dialog";

import {
  DeleteBudgetDialog,
} from "./delete-budget-dialog";


export interface BudgetRow {

  id: string;

  description: string;

  category: BudgetCategory;

  estimated: number;

  actual: number | null;

  paid: number | null;

  remarks: string | null;

  addedBy: string;

}



function formatCurrency(
  amount: number | null
) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(
    amount ?? 0
  );

}



export function getBudgetColumns(
  weddingId: string,
  onRefresh?: () => void
): ColumnDef<BudgetRow>[] {


  return [

    {
      accessorKey: "description",

      header: ({ column }) => (

        <DataTableColumnHeader
          column={column}
          title="Description"
        />

      ),

      cell: ({ row }) => (

        row.original.description

      ),

    },



    {
      accessorKey: "category",

      header: ({ column }) => (

        <DataTableColumnHeader
          column={column}
          title="Category"
        />

      ),

      cell: ({ row }) => (

        <Badge variant="secondary">

          {
            row.original.category
          }

        </Badge>

      ),

    },



    {
      accessorKey: "estimated",

      header: "Estimated",

      cell: ({ row }) =>

        formatCurrency(
          row.original.estimated
        ),

    },



    {
      accessorKey: "actual",

      header: "Actual",

      cell: ({ row }) =>

        formatCurrency(
          row.original.actual
        ),

    },



    {
      accessorKey: "paid",

      header: "Paid",

      cell: ({ row }) =>

        formatCurrency(
          row.original.paid
        ),

    },



    {
      accessorKey: "remarks",

      header: "Remarks",

      cell: ({ row }) =>

        row.original.remarks ?? "—",

    },



    {
      accessorKey: "addedBy",

      header: "Added By",

      cell: ({ row }) => (

        <Badge variant="outline">

          {
            row.original.addedBy
          }

        </Badge>

      ),

    },



    {
      id: "actions",

      header: "Actions",


      cell: ({ row }) => {


        const [
          editOpen,
          setEditOpen,
        ] =
          useState(false);



        const [
          deleteOpen,
          setDeleteOpen,
        ] =
          useState(false);



        return (

          <>


            <div className="flex gap-2">


              <Button

                size="sm"

                variant="outline"

                onClick={() =>
                  setEditOpen(true)
                }

              >

                Edit

              </Button>



              <Button

                size="sm"

                variant="destructive"

                onClick={() =>
                  setDeleteOpen(true)
                }

              >

                Delete

              </Button>


            </div>





            <EditBudgetDialog

              weddingId={
                weddingId
              }

              item={
                row.original
              }

              open={
                editOpen
              }

              onOpenChange={
                setEditOpen
              }

              onSuccess={
                onRefresh
              }

            />





            <DeleteBudgetDialog

              weddingId={
                weddingId
              }

              budgetId={
                row.original.id
              }

              open={
                deleteOpen
              }

              onOpenChange={
                setDeleteOpen
              }

              onSuccess={
                onRefresh
              }

            />


          </>

        );

      },

    },

  ];

}