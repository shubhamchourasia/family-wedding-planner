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
      (sum, item) =>
        sum + item.estimated,
      0
    );


  const actual =
    budgetItems.reduce(
      (sum, item) =>
        sum + (item.actual ?? 0),
      0
    );


  const paid =
    budgetItems.reduce(
      (sum, item) =>
        sum + (item.paid ?? 0),
      0
    );


  const remaining =
    estimated - actual;


  const cardClass =
    `
    rounded-2xl
    border
    border-amber-100
    workspace-card
    p-5
    shadow-sm
    transition
    hover:shadow-md
    `;


  return (
    <div className="grid gap-4 md:grid-cols-5">


      <div className={cardClass}>

        <p className="text-sm font-medium text-stone-500">
          Overall Budget
        </p>

        <p className="mt-2 text-2xl font-bold text-stone-900">
          ₹
          {
            overallBudget?.toLocaleString(
              "en-IN"
            ) ?? 0
          }
        </p>

      </div>



      <div className={cardClass}>

        <p className="text-sm font-medium text-stone-500">
          Estimated
        </p>

        <p className="mt-2 text-2xl font-bold text-stone-900">
          ₹
          {
            estimated.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>



      <div className={cardClass}>

        <p className="text-sm font-medium text-stone-500">
          Actual
        </p>

        <p className="mt-2 text-2xl font-bold text-stone-900">
          ₹
          {
            actual.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>



      <div className={cardClass}>

        <p className="text-sm font-medium text-stone-500">
          Paid
        </p>

        <p className="mt-2 text-2xl font-bold text-green-600">
          ₹
          {
            paid.toLocaleString(
              "en-IN"
            )
          }
        </p>

      </div>



      <div className={cardClass}>

        <p className="text-sm font-medium text-stone-500">
          Remaining
        </p>

        <p className={`
          mt-2
          text-2xl
          font-bold
          ${
            remaining >= 0
              ? "text-green-600"
              : "text-red-600"
          }
        `}>
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