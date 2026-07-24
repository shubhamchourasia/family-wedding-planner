"use client";

import { useState } from "react";

import {
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  WeddingForm,
} from "./wedding-form";

interface EditWeddingDialogProps {
  wedding: {
    id: string;
    title: string;
    brideName: string;
    groomName: string;
    startDate: Date;
    location: string | null;
    description: string | null;
  };
}

export function EditWeddingDialog({
  wedding,
}: EditWeddingDialogProps) {

  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger
        render={
          <button
            type="button"
            className="
              absolute
              right-5
              top-5
              z-20
              rounded-full
              p-2
              text-gray-400
              transition
              hover:bg-amber-50
              hover:text-amber-600
            "
          >
            <Pencil className="h-4 w-4" />
          </button>
        }
      />

      <DialogContent
        className="max-w-xl"
      >

        <DialogHeader>

          <DialogTitle>
            Edit Wedding
          </DialogTitle>

        </DialogHeader>

        <WeddingForm
          wedding={wedding}
          onSuccess={() => setOpen(false)}
        />

      </DialogContent>

    </Dialog>
  );

}