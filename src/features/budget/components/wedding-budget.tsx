"use client";

import {
  BudgetCategory,
} from "@prisma/client";

import {
  BudgetDashboard,
} from "./budget-dashboard";

import {
  BudgetTable,
} from "./budget-table";

import {
  CreateBudgetDialog,
} from "./create-budget-dialog";

import {
  OverallBudgetCard,
} from "./overall-budget-card";


interface WeddingBudgetProps {
  weddingId: string;
  overallBudget: number | null;

  budgetItems: Array<{
    id: string;
    description: string;
    category: BudgetCategory;
    estimated: number;
    actual: number | null;
    paid: number | null;
    remarks: string | null;
    addedBy: string;
  }>;
}


export function WeddingBudget({
  weddingId,
  overallBudget,
  budgetItems,
}: WeddingBudgetProps) {

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-end gap-3">

        <OverallBudgetCard
          weddingId={
            weddingId
          }
          overallBudget={
            overallBudget
          }
        />


        <CreateBudgetDialog
          weddingId={
            weddingId
          }
        />

      </div>


      <BudgetDashboard
        overallBudget={
          overallBudget
        }
        budgetItems={
          budgetItems
        }
      />


      <div className="rounded-xl border bg-white p-6">

        <BudgetTable
          weddingId={
            weddingId
          }
          items={
            budgetItems
          }
        />

      </div>

    </div>
  );
}