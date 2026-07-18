"use client";

import {
  useState,
} from "react";

import {
  BudgetCategory,
} from "@prisma/client";

import {
  DataTable,
} from "@/components/data-table/data-table";

import {
  getBudgetColumns,
  type BudgetRow,
} from "./budget-columns";


interface BudgetTableProps {
  weddingId: string;
  items: BudgetRow[];
}


export function BudgetTable({
  weddingId,
  items,
}: BudgetTableProps) {

  const [
    category,
    setCategory,
  ] = useState("");


  return (
    <DataTable
      columns={
        getBudgetColumns(
          weddingId
        )
      }
      data={
        items
      }
      categories={
        Object.values(
          BudgetCategory
        )
      }
      categoryFilter={
        category
      }
      onCategoryChange={
        setCategory
      }
      emptyTitle="No budget items"
      emptyDescription="No expenses have been added yet."
    />
  );

}