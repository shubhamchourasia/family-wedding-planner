"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import {
  deleteEventAction,
} from "../actions/delete-event";

interface DeleteEventDialogProps {
  eventId: string;
  weddingId: string;
}

export function DeleteEventDialog({
  eventId,
  weddingId,
}: DeleteEventDialogProps) {

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {

    if (!confirm("Delete this event?")) {
      return;
    }

    startTransition(async () => {
      await deleteEventAction(
        eventId,
        weddingId
      );
    });

  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}