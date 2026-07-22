"use client";

import {
  useTransition,
} from "react";

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
  deleteBudgetAction,
} from "../actions/delete-budget";


interface DeleteBudgetDialogProps {
  weddingId: string;
  budgetId: string;
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;
  onSuccess?: () => void;
}


export function DeleteBudgetDialog({
  weddingId,
  budgetId,
  open,
  onOpenChange,
  onSuccess,
}: DeleteBudgetDialogProps) {


  const [
    pending,
    startTransition,
  ] = useTransition();



  function handleDelete() {

    startTransition(
      async () => {

        const result =
          await deleteBudgetAction(
            budgetId,
            weddingId
          );


        if (
          result.success
        ) {

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
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Delete Budget Item
          </DialogTitle>

        </DialogHeader>


        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this budget item?
        </p>



        <div className="flex justify-end gap-3">


          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>



          <Button
            variant="destructive"
            disabled={pending}
            onClick={handleDelete}
          >

            {
              pending
                ? "Deleting..."
                : "Delete"
            }

          </Button>


        </div>


      </DialogContent>

    </Dialog>
  );
}