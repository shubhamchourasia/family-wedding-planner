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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Overall Budget"
        value={overallBudget}
        icon={Wallet}
        color="text-blue-600"
      />

      <StatCard
        title="Estimated"
        value={estimated}
        icon={PiggyBank}
        color="text-violet-600"
      />

      <StatCard
        title="Actual"
        value={actual}
        icon={CircleDollarSign}
        color="text-orange-600"
      />

      <StatCard
        title="Paid"
        value={paid}
        icon={CreditCard}
        color="text-emerald-600"
      />

      <StatCard
        title="Remaining"
        value={remaining}
        icon={Banknote}
        color={
          remaining >= 0
            ? "text-green-600"
            : "text-red-600"
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