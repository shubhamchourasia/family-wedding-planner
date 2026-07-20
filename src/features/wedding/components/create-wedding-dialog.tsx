"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { WeddingForm } from "./wedding-form";


export function CreateWeddingDialog() {

  const [open, setOpen] = useState(false);


  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger
        render={
          <Button
              size="lg"
              variant="outline"
              className="
                rounded-full
                border-amber-300
                bg-amber-50
                px-8
                text-amber-800
                hover:bg-amber-100
                hover:text-amber-900
              "
            >
            Create Wedding
          </Button>
        }
      />


      <DialogContent
        className="max-w-xl"
      >

        <DialogHeader>

          <DialogTitle>
            Create New Wedding
          </DialogTitle>

        </DialogHeader>


        <WeddingForm
          onSuccess={() => setOpen(false)}
        />

      </DialogContent>

    </Dialog>
  );
}