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