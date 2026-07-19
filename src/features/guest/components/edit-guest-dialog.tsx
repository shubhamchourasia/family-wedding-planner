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
  GuestForm,
} from "./guest-form";

interface EditGuestDialogProps {
  weddingId: string;
  events: Array<{
    id: string;
    title: string;
  }>;
  guest: {
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    side: any;
    food: any;
    relation: string | null;
    city: string | null;
    notes: string | null;
    events?: Array<{
      eventId: string;
    }>;
  };
  onSuccess?: () => void;
}

export function EditGuestDialog({
  weddingId,
  events,
  guest,
  onSuccess,
}: EditGuestDialogProps) {

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
          <button
            className="
              rounded-md
              border
              p-2
              hover:bg-gray-100
            "
          >
            <Pencil className="h-4 w-4" />
          </button>
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
            Edit Guest
          </DialogTitle>
        </DialogHeader>

        <GuestForm
          weddingId={weddingId}
          events={events}
          mode="edit"
          guest={guest}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}