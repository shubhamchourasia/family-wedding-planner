"use client";

interface BudgetCategoryChartProps {
  items: Array<{
    category: string;
    actual: number | null;
    estimated: number;
  }>;
}

export function BudgetCategoryChart({
  items,
}: BudgetCategoryChartProps) {

  const grouped = items.reduce<
    Record<string, number>
  >((acc, item) => {

    const amount =
      item.actual ?? item.estimated;

    acc[item.category] =
      (acc[item.category] ?? 0) +
      amount;

    return acc;

  }, {});

  const rows =
    Object.entries(grouped)
      .sort((a, b) => b[1] - a[1]);

  const max =
    rows.length > 0
      ? rows[0][1]
      : 0;

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">

      <h3 className="text-lg font-semibold">
        Category Spending
      </h3>

      <p className="mb-6 text-sm text-muted-foreground">
        Distribution of your wedding expenses.
      </p>

      <div className="space-y-5">

        {rows.length === 0 && (

          <div className="py-10 text-center text-muted-foreground">
            No budget items yet.
          </div>

        )}

        {rows.map(([category, amount]) => {

          const width =
            max === 0
              ? 0
              : (amount / max) * 100;

          return (

            <div key={category}>

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  {category}
                </span>

                <span className="text-sm text-muted-foreground">
                  ₹{amount.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${width}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}