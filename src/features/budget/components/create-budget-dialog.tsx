"use client";

import {
  useState,
} from "react";


import {
  Plus,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  BudgetForm,
} from "./budget-form";



interface CreateBudgetDialogProps {

  weddingId: string;

}



export function CreateBudgetDialog({

  weddingId,

}: CreateBudgetDialogProps) {


  const [
    open,
    setOpen,
  ] =
    useState(false);



  return (

    <Dialog
      open={
        open
      }
      onOpenChange={
        setOpen
      }
    >


      <DialogTrigger
  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
>
  Add Budget Item
</DialogTrigger>



      <DialogContent>


        <DialogHeader>

          <DialogTitle>
            Add Budget Item
          </DialogTitle>

        </DialogHeader>



        <BudgetForm

          weddingId={
            weddingId
          }

          onSuccess={() =>
            setOpen(false)
          }

        />


      </DialogContent>


    </Dialog>

  );

}