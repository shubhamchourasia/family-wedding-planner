"use client";

import {
  useTransition,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  deleteEventAction,
} from "../actions/delete-event";


interface DeleteEventDialogProps {

  eventId: string;

  weddingId: string;

  onSuccess?: () => void;

}


export function DeleteEventDialog({

  eventId,

  weddingId,

  onSuccess,

}: DeleteEventDialogProps) {


  const [
    pending,
    startTransition,
  ] = useTransition();



  function handleDelete() {

    if(
      !confirm(
        "Delete this event?"
      )
    ) {
      return;
    }


    startTransition(
      async () => {

        const result =
          await deleteEventAction(
            eventId,
            weddingId
          );


        if(result.success) {

          onSuccess?.();

        }

      }
    );

  }


  return (

    <Button

      size="icon"

      variant="destructive"

      className="
        h-8
        w-8
        rounded-full
      "

      disabled={
        pending
      }

      onClick={
        handleDelete
      }

    >

      <Trash2
        className="
          h-4
          w-4
        "
      />

    </Button>

  );

}