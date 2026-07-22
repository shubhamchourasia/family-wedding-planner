"use client";


import {
  useState,
} from "react";


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



interface CreateEventDialogProps {

  weddingId: string;

  onSuccess?: () => void | Promise<void>;

}



export function CreateEventDialog({

  weddingId,

  onSuccess,

}: CreateEventDialogProps) {


  const [
    open,
    setOpen,
  ] = useState(false);



  async function handleSuccess() {

    setOpen(false);


    if (onSuccess) {

      await onSuccess();

    }

  }



  return (

    <>

      <Button

        onClick={() =>
          setOpen(true)
        }

      >

        + Add Event

      </Button>



      <Dialog

        open={
          open
        }

        onOpenChange={
          setOpen
        }

      >

        <DialogContent

          className="
            max-w-3xl
          "

        >

          <DialogHeader>

            <DialogTitle>

              Create Event

            </DialogTitle>

          </DialogHeader>



          <EventForm

            weddingId={
              weddingId
            }

            onSuccess={
              handleSuccess
            }

          />


        </DialogContent>


      </Dialog>


    </>

  );

}