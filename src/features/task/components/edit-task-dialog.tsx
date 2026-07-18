"use client";

import {
  useState,
  useTransition,
} from "react";

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

import {
  updateTaskAction,
} from "../actions/update-task";


interface EditTaskDialogProps {
  weddingId: string;
  task: {
    id: string;
    title: string;
    category: string;
    addedBy: string;
    dueDate: Date | null;
    remarks: string | null;
  };
}


export function EditTaskDialog({
  weddingId,
  task,
}: EditTaskDialogProps) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    pending,
    startTransition,
  ] = useTransition();


  const [
    title,
    setTitle,
  ] = useState(task.title);


  const [
    category,
    setCategory,
  ] = useState(task.category);


  const [
    addedBy,
    setAddedBy,
  ] = useState(task.addedBy);


  const [
    dueDate,
    setDueDate,
  ] = useState(
    task.dueDate
      ? new Date(task.dueDate)
          .toISOString()
          .split("T")[0]
      : ""
  );


  const [
    remarks,
    setRemarks,
  ] = useState(
    task.remarks ?? ""
  );


  function handleSubmit() {

    startTransition(
      async () => {

        const result =
          await updateTaskAction(
            weddingId,
            task.id,
            {
              title,
              category,
              addedBy,
              dueDate: dueDate
                ? new Date(dueDate)
                : null,
              remarks,
            }
          );


        if (result.success) {
          setOpen(false);
        }

      }
    );

  }


  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setOpen(true)
        }
      >
        Edit
      </Button>


      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Task
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">


          <div className="space-y-2">

            <Label>
              Task Name
            </Label>

            <Input
              value={title}
              onChange={(e)=>
                setTitle(
                  e.target.value
                )
              }
            />

          </div>


          <div className="space-y-2">

            <Label>
              Category
            </Label>

            <Input
              value={category}
              onChange={(e)=>
                setCategory(
                  e.target.value
                )
              }
            />

          </div>


          <div className="space-y-2">

            <Label>
              Added By
            </Label>

            <Input
              value={addedBy}
              onChange={(e)=>
                setAddedBy(
                  e.target.value
                )
              }
            />

          </div>


          <div className="space-y-2">

            <Label>
              Due Date
            </Label>

            <Input
              type="date"
              value={dueDate}
              onChange={(e)=>
                setDueDate(
                  e.target.value
                )
              }
            />

          </div>


          <div className="space-y-2">

            <Label>
              Remarks
            </Label>

            <Input
              value={remarks}
              onChange={(e)=>
                setRemarks(
                  e.target.value
                )
              }
            />

          </div>


          <div className="flex justify-end">

            <Button
              disabled={pending}
              onClick={handleSubmit}
            >
              {
                pending
                  ? "Saving..."
                  : "Update Task"
              }
            </Button>

          </div>


        </div>


      </DialogContent>


    </Dialog>
  );
}