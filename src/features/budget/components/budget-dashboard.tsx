"use client";

interface BudgetDashboardProps {
  overallBudget: number | null;
  budgetItems: Array<{
    id: string;
    estimated: number;
    actual: number | null;
    paid: number | null;
  }>;
}


export function BudgetDashboard({
  overallBudget,
  budgetItems,
}: BudgetDashboardProps) {

  const estimated =
    budgetItems.reduce(
      (
        sum,
        item
      ) =>
        sum + item.estimated,
      0
    );


  const actual =
    budgetItems.reduce(
      (
        sum,
        item
      ) =>
        sum + (item.actual ?? 0),
      0
    );


  const paid =
    budgetItems.reduce(
      (
        sum,
        item
      ) =>
        sum + (item.paid ?? 0),
      0
    );


  const remaining =
    estimated - actual;


  return (
    <div className="grid gap-4 md:grid-cols-5">

      <div className="rounded-xl border bg-white p-5">

        <p className="text-sm text-muted-foreground">
          Overall Budget
        </p>

        <p className="mt-2 text-2xl font-semibold">
          ₹
          {
            overallBudget?.toLocaleString(
              "en-IN"
            ) ?? 0
          }
        </p>

      </div>


      <div className="rounded-xl border bg-white p-5">

        <p className="text-sm text-muted-foreground">
          Estimated
        </p>

        <p className="mt-2 text-2xl font-semibold">
          ₹
          {
            estimated.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>


      <div className="rounded-xl border bg-white p-5">

        <p className="text-sm text-muted-foreground">
          Actual
        </p>

        <p className="mt-2 text-2xl font-semibold">
          ₹
          {
            actual.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>


      <div className="rounded-xl border bg-white p-5">

        <p className="text-sm text-muted-foreground">
          Paid
        </p>

        <p className="mt-2 text-2xl text-green-600 font-semibold">
          ₹
          {
            paid.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>


      <div className="rounded-xl border bg-white p-5">

        <p className="text-sm text-muted-foreground">
          Remaining
        </p>

        <p className="mt-2 text-2xl font-semibold">
          ₹
          {
            remaining.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>

    </div>
  );
}