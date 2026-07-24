"use client";

import {
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  BudgetForm,
} from "./budget-form";


interface CreateBudgetDialogProps {
  weddingId: string;
  onSuccess?: () => void | Promise<void>;
}


export function CreateBudgetDialog({
  weddingId,
  onSuccess,
}: CreateBudgetDialogProps) {


  const [
    open,
    setOpen,
  ] = useState(false);



  async function handleSuccess() {

    setOpen(false);

    await onSuccess?.();

  }



  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger
        render={
          <Button>
            Add Budget Item
          </Button>
        }
      />


      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Add Budget Item
          </DialogTitle>

        </DialogHeader>



        <BudgetForm

          weddingId={weddingId}

          onSuccess={handleSuccess}

        />


      </DialogContent>


    </Dialog>

  );
}