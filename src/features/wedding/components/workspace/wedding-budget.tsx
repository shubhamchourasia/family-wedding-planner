"use client";

interface WeddingBudgetProps {
  weddingId: string;

  overallBudget: number | null;

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
    (overallBudget ?? 0) - actual;



  return (

    <div className="space-y-6">


      <div className="grid gap-4 md:grid-cols-5">


        <BudgetCard
          title="Overall Budget"
          value={overallBudget ?? 0}
        />


        <BudgetCard
          title="Estimated"
          value={estimated}
        />


        <BudgetCard
          title="Actual"
          value={actual}
        />


        <BudgetCard
          title="Paid"
          value={paid}
        />


        <BudgetCard
          title="Remaining"
          value={remaining}
          danger={
            remaining < 0
          }
        />


      </div>


      <div className="
        rounded-xl
        border
        bg-white
        p-6
      ">


        <h3 className="
          text-xl
          font-semibold
        ">
          Budget Items
        </h3>


        <p className="
          text-sm
          text-muted-foreground
        ">
          Wedding ID: {weddingId}
        </p>



        {
          budgetItems.length === 0 ? (

            <div className="
              py-16
              text-center
              text-muted-foreground
            ">
              No budget items yet.
            </div>

          ) : (

            <div className="
              mt-6
              overflow-x-auto
            ">


              <table className="w-full">


                <thead>

                  <tr className="
                    border-b
                    text-left
                  ">

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


                  {
                    budgetItems.map(
                      item => (

                        <tr
                          key={
                            item.id
                          }
                          className="
                            border-b
                          "
                        >

                          <td className="py-4">

                            <div className="
                              font-medium
                            ">
                              {
                                item.description
                              }
                            </div>


                            {
                              item.vendor && (

                                <div className="
                                  text-sm
                                  text-muted-foreground
                                ">
                                  {
                                    item.vendor.name
                                  }
                                </div>

                              )
                            }

                          </td>



                          <td>
                            {
                              item.category
                            }
                          </td>



                          <td className="text-right">
                            ₹
                            {
                              item.estimated.toLocaleString()
                            }
                          </td>



                          <td className="text-right">
                            ₹
                            {
                              (
                                item.actual ?? 0
                              ).toLocaleString()
                            }
                          </td>



                          <td className="text-right">
                            ₹
                            {
                              (
                                item.paid ?? 0
                              ).toLocaleString()
                            }
                          </td>


                        </tr>

                      )
                    )
                  }


                </tbody>


              </table>


            </div>

          )
        }


      </div>


    </div>

  );

}



function BudgetCard({
  title,
  value,
  danger,
}:{
  title:string;
  value:number;
  danger?:boolean;
}) {


  return (

    <div className="
      rounded-xl
      border
      bg-white
      p-5
    ">

      <p className="
        text-sm
        text-muted-foreground
      ">
        {title}
      </p>


      <h2
        className={`
          mt-2
          text-2xl
          font-bold
          ${
            danger
            ? "text-red-600"
            : ""
          }
        `}
      >
        ₹
        {
          value.toLocaleString()
        }
      </h2>


    </div>

  );

}