"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  deleteGuestAction,
} from "../actions/delete-guest";

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


interface DeleteGuestDialogProps {
  guestId: string;
  guestName: string;
  onSuccess?: () => void | Promise<void>;
}


export function DeleteGuestDialog({
  guestId,
  guestName,
  onSuccess,
}: DeleteGuestDialogProps) {

  const [
    open,
    setOpen,
  ] = useState(false);


  const [
    isPending,
    startTransition,
  ] = useTransition();



  function handleDelete() {

  startTransition(async () => {

    const result =
      await deleteGuestAction(
        guestId
      );

    if (!result.success) {

      console.error(
        result.error
      );

      return;
    }
    setOpen(false);
    await onSuccess?.();

  });

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
              text-red-600
              hover:bg-red-50
            "
          >
            <Trash2 className="h-4 w-4" />
          </button>
        }
      />


      <DialogContent
        className="max-w-md"
      >

        <DialogHeader>

          <DialogTitle>
            Delete Guest
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-5">

          <p className="text-gray-600">
            Are you sure you want to remove
            <span className="font-semibold">
              {" "}{guestName}
            </span>
            ?
          </p>


          <div className="flex justify-end gap-3">


            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>


            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >

              {
                isPending
                  ? "Deleting..."
                  : "Delete"
              }

            </Button>


          </div>

        </div>


      </DialogContent>

    </Dialog>
  );
}