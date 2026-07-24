"use client";

import {
  useState,
} from "react";

import {
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  EventForm,
} from "./event-form";


interface EditEventDialogProps {
  event: any;
  weddingId: string;
  onSuccess?: () => void;
}


export function EditEventDialog({
  event,
  weddingId,
  onSuccess,
}: EditEventDialogProps) {

  const [
    open,
    setOpen,
  ] = useState(false);


  function handleSuccess() {

    setOpen(false);

    onSuccess?.();

  }


  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="
          h-8
          w-8
          rounded-full
          hover:bg-amber-50
        "
        onClick={() =>
          setOpen(true)
        }
      >
        <Pencil
          className="
            h-4
            w-4
          "
        />
      </Button>


      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent
          className="max-w-2xl"
        >

          <DialogHeader>

            <DialogTitle>
              Edit Event
            </DialogTitle>

          </DialogHeader>


          <EventForm

            weddingId={
              weddingId
            }

            event={
              event
            }

            mode="edit"

            onSuccess={
              handleSuccess
            }

          />

        </DialogContent>

      </Dialog>

    </>
  );

}