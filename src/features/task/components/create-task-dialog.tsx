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
  TaskForm,
} from "./task-form";



interface CreateTaskDialogProps {

  weddingId:string;

  taskListId:string;

  onSuccess?:()=>void | Promise<void>;

}



export function CreateTaskDialog({

  weddingId,
  taskListId,
  onSuccess,

}:CreateTaskDialogProps){


  const [
    open,
    setOpen,
  ] = useState(false);



  return (

    <>

      <Button

        onClick={()=>
          setOpen(true)
        }

      >

        Add Task

      </Button>




      <Dialog

        open={
          open
        }

        onOpenChange={
          setOpen
        }

      >


        <DialogContent>


          <DialogHeader>

            <DialogTitle>
              Add Task
            </DialogTitle>

          </DialogHeader>



          <TaskForm

            weddingId={
              weddingId
            }

            taskListId={
              taskListId
            }

            mode="create"

            onSuccess={()=>{
              
              setOpen(false);

              onSuccess?.();

            }}

          />


        </DialogContent>


      </Dialog>


    </>

  );

}