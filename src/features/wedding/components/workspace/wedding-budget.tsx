"use client";

interface WeddingBudgetProps {
  weddingId: string;
  overallBudget: number |null;
  budgetItems: Array<{
    id: string;
    description: string;
    category: string;
    estimated: number;
    actual: number | null;
    paid: number | null;
    vendor: {
      id: string;
      name: string;
    } | null;
  }>;
}

export function WeddingBudget({
  weddingId,
  overallBudget,
  budgetItems,
}: WeddingBudgetProps) {

  const estimated = budgetItems.reduce(
    (sum,item)=>sum+item.estimated,
    0
  );

  const actual = budgetItems.reduce(
    (sum,item)=>sum+(item.actual??0),
    0
  );

  const paid = budgetItems.reduce(
    (sum,item)=>sum+(item.paid??0),
    0
  );

  const remaining =
    (overallBudget??0)-actual;

  return (
    <div className="space-y-6">

      <div className="grid gap-4 md:grid-cols-5">

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Overall Budget
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            ₹{(overallBudget??0).toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Estimated
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            ₹{estimated.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Actual
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            ₹{actual.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Paid
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            ₹{paid.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Remaining
          </p>
          <h2 className={`mt-2 text-2xl font-bold ${remaining>=0?"text-green-600":"text-red-600"}`}>
            ₹{remaining.toLocaleString()}
          </h2>
        </div>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-xl font-semibold">
              Budget Items
            </h3>
            <p className="text-sm text-muted-foreground">
              Wedding ID: {weddingId}
            </p>
          </div>

        </div>

        {budgetItems.length===0?(
          <div className="py-16 text-center text-muted-foreground">
            No budget items yet.
          </div>
        ):(
          <div className="mt-6 overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="pb-3">
                    Description
                  </th>

                  <th className="pb-3">
                    Category
                  </th>

                  <th className="pb-3 text-right">
                    Estimated
                  </th>

                  <th className="pb-3 text-right">
                    Actual
                  </th>

                  <th className="pb-3 text-right">
                    Paid
                  </th>

                </tr>

              </thead>

              <tbody>

                {budgetItems.map(item=>(
                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {item.description}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td className="text-right">
                      ₹{item.estimated.toLocaleString()}
                    </td>

                    <td className="text-right">
                      ₹{(item.actual??0).toLocaleString()}
                    </td>

                    <td className="text-right">
                      ₹{(item.paid??0).toLocaleString()}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}