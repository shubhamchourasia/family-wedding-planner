"use client";

import { useState } from "react";

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
  GuestForm,
} from "./guest-form";

interface CreateGuestDialogProps {
  weddingId: string;
  events: Array<{
    id: string;
    title: string;
  }>;
  onSuccess?: () => void;
}

export function CreateGuestDialog({
  weddingId,
  events,
  onSuccess,
}: CreateGuestDialogProps) {

  const [open, setOpen] = useState(false);

  function handleSuccess() {
    setOpen(false);
    onSuccess?.();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button>
            Add Guest
          </Button>
        }
      />

      <DialogContent
        className="
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle>
            Add Guest
          </DialogTitle>
        </DialogHeader>

        <GuestForm
          weddingId={weddingId}
          events={events}
          mode="create"
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}