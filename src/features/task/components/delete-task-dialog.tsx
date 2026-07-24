"use client";

import {
  useState,
  useTransition,
} from "react";


import {
  Trash2,
} from "lucide-react";


import {
  deleteTaskAction,
} from "../actions/delete-task";


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



interface DeleteTaskDialogProps {

  weddingId:string;

  taskId:string;

  taskTitle:string;

  onSuccess?:()=>void | Promise<void>;

}



export function DeleteTaskDialog({

  weddingId,
  taskId,
  taskTitle,
  onSuccess,

}:DeleteTaskDialogProps){


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
        await deleteTaskAction(
          weddingId,
          taskId
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

            <Trash2 className="h-4 w-4"/>

          </button>

        }

      />



      <DialogContent

        className="max-w-md"

      >


        <DialogHeader>

          <DialogTitle>
            Delete Task
          </DialogTitle>

        </DialogHeader>




        <div className="space-y-5">


          <p className="text-gray-600">

            Are you sure you want to delete

            <span className="font-semibold">

              {" "}
              {taskTitle}

            </span>

            ?

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


        </div>


      </DialogContent>


    </Dialog>

  );

}