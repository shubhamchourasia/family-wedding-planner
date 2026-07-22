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

  onRefresh?: () => void;

}



export function WeddingBudget({

  weddingId,

  overallBudget,

  budgetItems,

  onRefresh,

}: WeddingBudgetProps) {


  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between gap-3">


        <div>

          <h2 className="pl-2 text-2xl font-semibold text-stone-900">

            Budget Management

          </h2>


          <p className="pl-2 text-gray-500">

            Manage budget items and expenses.

          </p>


        </div>



        <div className="flex items-center gap-3">


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

            onSuccess={
              onRefresh
            }

          />


        </div>


      </div>




      <BudgetDashboard

        overallBudget={
          overallBudget
        }

        budgetItems={
          budgetItems
        }

      />




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

        <BudgetTable

          weddingId={
            weddingId
          }

          items={
            budgetItems
          }

          onRefresh={
            onRefresh
          }

        />


      </div>


    </div>

  );

}