"use client";

import {
  useState,
  useTransition,
} from "react";


import {
  deleteTaskListAction,
} from "../actions/delete-task-list";


import {
  Button,
} from "@/components/ui/button";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



interface DeleteTaskListDialogProps {

  weddingId:string;

  taskListId:string;

  onSuccess?:()=>void | Promise<void>;

}



export function DeleteTaskListDialog({

  weddingId,
  taskListId,
  onSuccess,

}:DeleteTaskListDialogProps){


  const [
    open,
    setOpen,
  ] = useState(false);



  const [
    pending,
    startTransition,
  ] = useTransition();



  function handleDelete(){


    startTransition(async()=>{


      const result =
        await deleteTaskListAction(
          weddingId,
          taskListId
        );



      if(result.success){

        setOpen(false);

        onSuccess?.();

      }


    });


  }



  return (

    <Dialog

      open={
        open
      }

      onOpenChange={
        setOpen
      }

    >


      <Button

        size="sm"

        variant="destructive"

        onClick={()=>
          setOpen(true)
        }

      >
        Delete List
      </Button>




      <DialogContent>


        <DialogHeader>

          <DialogTitle>
            Delete Task List
          </DialogTitle>

        </DialogHeader>



        <p className="text-sm text-muted-foreground">

          This will delete the list and all tasks inside it.

        </p>



        <div className="flex justify-end gap-3">


          <Button

            variant="outline"

            onClick={()=>
              setOpen(false)
            }

          >

            Cancel

          </Button>



          <Button

            variant="destructive"

            disabled={
              pending
            }

            onClick={
              handleDelete
            }

          >

            {
              pending
              ? "Deleting..."
              : "Delete"
            }

          </Button>


        </div>


      </DialogContent>


    </Dialog>

  );

}