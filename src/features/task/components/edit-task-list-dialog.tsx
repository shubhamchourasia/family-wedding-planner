"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  updateTaskListAction,
} from "../actions/update-task-list";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditTaskListDialogProps {
  weddingId: string;
  taskList: {
    id: string;
    name: string;
  };
}

export function EditTaskListDialog({
  weddingId,
  taskList,
}: EditTaskListDialogProps) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    pending,
    startTransition,
  ] = useTransition();

  const [
    name,
    setName,
  ] = useState(
    taskList.name
  );

  function handleUpdate() {

    startTransition(async()=>{

      const result =
        await updateTaskListAction(
          weddingId,
          taskList.id,
          name
        );

      if(result.success){
        setOpen(false);
      }

    });

  }


  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <Button
        size="sm"
        variant="outline"
        onClick={()=>
          setOpen(true)
        }
      >
        Edit List
      </Button>


      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Task List
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">

          <div className="space-y-2">

            <Label>
              List Name
            </Label>

            <Input
              value={name}
              onChange={(e)=>
                setName(
                  e.target.value
                )
              }
            />

          </div>


          <Button
            disabled={
              pending ||
              !name.trim()
            }
            onClick={
              handleUpdate
            }
          >
            {
              pending
              ? "Updating..."
              : "Update List"
            }
          </Button>


        </div>


      </DialogContent>

    </Dialog>
  );
}