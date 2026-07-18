"use client";

import {
  useTransition,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  z,
} from "zod";

import {
  BudgetCategory,
} from "@prisma/client";

import {
  budgetSchema,
} from "../schemas/budget.schema";

import {
  createBudgetAction,
} from "../actions/create-budget";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";


interface BudgetFormProps {
  weddingId: string;
  onSuccess?: () => void;
}


type BudgetInput =
  z.input<typeof budgetSchema>;


type BudgetOutput =
  z.output<typeof budgetSchema>;


const addedByOptions = [
  "SHUBHAM",
  "AAKRITI",
  "MUSKAN",
  "ANKITA",
  "SOURAV",
];


export function BudgetForm({
  weddingId,
  onSuccess,
}: BudgetFormProps) {


  const [
    pending,
    startTransition,
  ] =
    useTransition();



  const form =
    useForm<
      BudgetInput,
      unknown,
      BudgetOutput
    >({

      resolver:
        zodResolver(
          budgetSchema
        ),


      defaultValues: {

        description:
          "",


        category:
          BudgetCategory.OTHER,


        estimated:
          0,


        actual:
          null,


        paid:
          null,


        remarks:
          "",


        addedBy:
          "SHUBHAM",

      },

    });



  function onSubmit(
    values: BudgetOutput
  ) {

    startTransition(
      async () => {

        const result =
          await createBudgetAction(
            weddingId,
            values
          );


        if (
          result.success
        ) {

          form.reset();

          onSuccess?.();

        }

      }
    );

  }



  return (

    <form

      onSubmit={
        form.handleSubmit(
          onSubmit
        )
      }

      className="space-y-5"

    >


      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <Input

          placeholder="Wedding venue, catering, decoration..."

          {...form.register(
            "description"
          )}

        />

      </div>




      <div className="space-y-2">

        <Label>
          Category
        </Label>


        <select

          className="h-10 w-full rounded-md border px-3 text-sm"

          {...form.register(
            "category"
          )}

        >

          {
            Object.values(
              BudgetCategory
            ).map(
              (
                category
              ) => (

                <option

                  key={
                    category
                  }

                  value={
                    category
                  }

                >

                  {
                    category
                  }

                </option>

              )
            )
          }

        </select>

      </div>




      <div className="grid gap-5 md:grid-cols-3">


        <div className="space-y-2">

          <Label>
            Estimated Amount
          </Label>


          <Input

            type="number"

            {...form.register(
              "estimated"
            )}

          />

        </div>



        <div className="space-y-2">

          <Label>
            Actual Amount
          </Label>


          <Input

            type="number"

            {...form.register(
              "actual"
            )}

          />

        </div>



        <div className="space-y-2">

          <Label>
            Paid Amount
          </Label>


          <Input

            type="number"

            {...form.register(
              "paid"
            )}

          />

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Remarks
        </Label>


        <Input

          placeholder="Additional comments..."

          {...form.register(
            "remarks"
          )}

        />

      </div>





      <div className="space-y-2">

        <Label>
          Added By
        </Label>


        <select

          className="h-10 w-full rounded-md border px-3 text-sm"

          {...form.register(
            "addedBy"
          )}

        >

          {
            addedByOptions.map(
              (
                person
              ) => (

                <option

                  key={
                    person
                  }

                  value={
                    person
                  }

                >

                  {
                    person
                  }

                </option>

              )
            )
          }


        </select>


      </div>





      <div className="flex justify-end pt-2">


        <Button

          type="submit"

          disabled={
            pending
          }

        >

          {
            pending
              ? "Saving..."
              : "Save Budget Item"
          }


        </Button>


      </div>


    </form>

  );

}