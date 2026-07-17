"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { EventForm } from "./event-form";

interface EditEventDialogProps {
  event: any;
  weddingId: string;
}

export function EditEventDialog({
  event,
  weddingId,
}: EditEventDialogProps) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-2xl">

          <DialogHeader>

            <DialogTitle>
              Edit Event
            </DialogTitle>

          </DialogHeader>

          <EventForm
            weddingId={weddingId}
            event={event}
            mode="edit"
            onSuccess={() => setOpen(false)}
          />

        </DialogContent>
      </Dialog>
    </>
  );
}