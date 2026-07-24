"use client";

import {
  Banknote,
  CircleDollarSign,
  CreditCard,
  PiggyBank,
  Wallet,
} from "lucide-react";

import {
  StatCard,
} from "@/components/common/stat-card";


interface BudgetSummaryProps {
  overallBudget: number;
  estimated: number;
  actual: number;
  paid: number;
}


export function BudgetSummary({
  overallBudget,
  estimated,
  actual,
  paid,
}: BudgetSummaryProps) {


  const remaining =
    overallBudget - actual;


  return (

    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-5
      "
    >

      <StatCard
        title="Overall Budget"
        value={overallBudget}
        icon={Wallet}
        color="text-amber-700"
      />


      <StatCard
        title="Estimated"
        value={estimated}
        icon={PiggyBank}
        color="text-stone-700"
      />


      <StatCard
        title="Actual"
        value={actual}
        icon={CircleDollarSign}
        color="text-orange-700"
      />


      <StatCard
        title="Paid"
        value={paid}
        icon={CreditCard}
        color="text-green-700"
      />


      <StatCard
        title="Remaining"
        value={remaining}
        icon={Banknote}
        color={
          remaining >= 0
            ? "text-emerald-700"
            : "text-red-700"
        }
        subtitle={
          remaining >= 0
            ? "Within budget"
            : "Budget exceeded"
        }
      />


    </div>

  );
}