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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  budgetSchema,
} from "../schemas/budget.schema";

import {
  updateBudgetAction,
} from "../actions/update-budget";


interface EditBudgetDialogProps {

  weddingId: string;

  item: {
    id: string;
    description: string;
    category: BudgetCategory;
    estimated: number;
    actual: number | null;
    paid: number | null;
    remarks: string | null;
    addedBy: string;
  };

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

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



export function EditBudgetDialog({

  weddingId,

  item,

  open,

  onOpenChange,

  onSuccess,

}: EditBudgetDialogProps) {


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
          item.description,

        category:
          item.category,

        estimated:
          item.estimated,

        actual:
          item.actual,

        paid:
          item.paid,

        remarks:
          item.remarks ?? "",

        addedBy:
          item.addedBy as BudgetInput["addedBy"],

      },

    });



  function onSubmit(
    values: BudgetOutput
  ) {


    startTransition(

      async () => {


        const result =
          await updateBudgetAction(
            item.id,
            weddingId,
            values
          );



        if (
          result.success
        ) {


          form.reset();


          onOpenChange(
            false
          );


          onSuccess?.();


        }


      }

    );


  }



  return (

    <Dialog

      open={
        open
      }

      onOpenChange={
        onOpenChange
      }

    >

      <DialogContent>


        <DialogHeader>

          <DialogTitle>
            Edit Budget Item
          </DialogTitle>

        </DialogHeader>



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

              className="
                h-10
                w-full
                rounded-md
                border
                px-3
                text-sm
              "

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
                Estimated
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
                Actual
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
                Paid
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

              className="
                h-10
                w-full
                rounded-md
                border
                px-3
                text-sm
              "

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
                  ? "Updating..."
                  : "Update Budget"
              }


            </Button>


          </div>



        </form>


      </DialogContent>


    </Dialog>

  );

}