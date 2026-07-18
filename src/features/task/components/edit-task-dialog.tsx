"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

import {
  updateTaskAction,
} from "../actions/update-task";

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

interface EditTaskDialogProps {
  weddingId: string;
  task: {
    id: string;
    title: string;
    category: TaskCategory;
    addedBy: TaskAddedBy;
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

  const categories =
    Object.values(TaskCategory);

  const addedByOptions =
    Object.values(TaskAddedBy);

  const [
    title,
    setTitle,
  ] = useState(task.title);

  const [
    category,
    setCategory,
  ] = useState<TaskCategory>(
    task.category
  );

  const [
    addedBy,
    setAddedBy,
  ] = useState<TaskAddedBy>(
    task.addedBy
  );

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

    startTransition(async () => {

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
        variant="outline"
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
              value={
                title
              }
              onChange={(e) =>
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

            <select
              className="h-10 w-full rounded-md border px-3"
              value={
                category
              }
              onChange={(e) =>
                setCategory(
                  e.target.value as TaskCategory
                )
              }
            >

              {
                categories.map(
                  (item) => (
                    <option
                      key={
                        item
                      }
                      value={
                        item
                      }
                    >
                      {
                        item
                      }
                    </option>
                  )
                )
              }

            </select>

          </div>


          <div className="space-y-2">

            <Label>
              Added By
            </Label>

            <select
              className="h-10 w-full rounded-md border px-3"
              value={
                addedBy
              }
              onChange={(e) =>
                setAddedBy(
                  e.target.value as TaskAddedBy
                )
              }
            >

              {
                addedByOptions.map(
                  (item) => (
                    <option
                      key={
                        item
                      }
                      value={
                        item
                      }
                    >
                      {
                        item
                      }
                    </option>
                  )
                )
              }

            </select>

          </div>


          <div className="space-y-2">

            <Label>
              Due Date
            </Label>

            <Input
              type="date"
              value={
                dueDate
              }
              onChange={(e) =>
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
              value={
                remarks
              }
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
            />

          </div>


          <div className="flex justify-end">

            <Button
              disabled={
                pending ||
                !title.trim()
              }
              onClick={
                handleSubmit
              }
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