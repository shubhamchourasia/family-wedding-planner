"use client";

interface BudgetProgressProps {
  overallBudget: number;
  actual: number;
}

export function BudgetProgress({
  overallBudget,
  actual,
}: BudgetProgressProps) {

  const percentage =
    overallBudget > 0
      ? Math.min(
          (actual / overallBudget) * 100,
          100
        )
      : 0;

  const remaining =
    overallBudget - actual;

  const barColor =
    percentage >= 90
      ? "bg-red-500"
      : percentage >= 70
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            Budget Utilization
          </h3>

          <p className="text-sm text-muted-foreground">
            ₹{actual.toLocaleString("en-IN")} of ₹{overallBudget.toLocaleString("en-IN")}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            percentage >= 90
              ? "bg-red-100 text-red-700"
              : percentage >= 70
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {percentage.toFixed(1)}%
        </span>

      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-muted">

        <div
          className={`h-full transition-all duration-700 ${barColor}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-6 flex justify-between text-sm">

        <div>

          <p className="text-muted-foreground">
            Remaining
          </p>

          <p
            className={`font-semibold ${
              remaining >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{remaining.toLocaleString("en-IN")}
          </p>

        </div>

        <div className="text-right">

          <p className="text-muted-foreground">
            Budget Used
          </p>

          <p className="font-semibold">
            ₹{actual.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

    </div>
  );
}