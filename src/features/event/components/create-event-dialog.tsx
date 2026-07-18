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

interface CreateEventDialogProps {
  weddingId: string;
}

export function CreateEventDialog({
  weddingId,
}: CreateEventDialogProps) {

  const [open, setOpen] =
    useState(false);

  return (
    <>

      <Button
        onClick={() => setOpen(true)}
      >
        + Add Event
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent
          className="max-w-3xl"
        >

          <DialogHeader>

            <DialogTitle>
              Create Event
            </DialogTitle>

          </DialogHeader>

          <EventForm
            weddingId={weddingId}
            onSuccess={() => setOpen(false)}
          />

        </DialogContent>

      </Dialog>

    </>
  );
}