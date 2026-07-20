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
  createTaskAction,
} from "../actions/create-task";

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

interface CreateTaskDialogProps {
  weddingId: string;
  taskListId: string;
  onSuccess?: () => void;
}

export function CreateTaskDialog({
  weddingId,
  taskListId,
  onSuccess,
}: CreateTaskDialogProps) {

  const [open, setOpen] =
    useState(false);

  const [pending, startTransition] =
    useTransition();

  const categories =
    Object.values(TaskCategory);

  const addedByOptions =
    Object.values(TaskAddedBy);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState<TaskCategory>(
      categories[0]
    );

  const [addedBy, setAddedBy] =
    useState<TaskAddedBy>(
      addedByOptions[0]
    );

  const [dueDate, setDueDate] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  function handleSubmit() {

    startTransition(async () => {

      const result =
        await createTaskAction(
          weddingId,
          taskListId,
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

      if (!result.success) {
        console.error(result.error);
        return;
      }

      setTitle("");
      setCategory(
        categories[0]
      );
      setAddedBy(
        addedByOptions[0]
      );
      setDueDate("");
      setRemarks("");

      setOpen(false);

      onSuccess?.();

    });

  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <Button
        onClick={() =>
          setOpen(true)
        }
      >
        Add Task
      </Button>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Add Task
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <div className="space-y-2">

            <Label>
              Task Name
            </Label>

            <Input
              value={title}
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
              value={category}
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
                      key={item}
                      value={item}
                    >
                      {item}
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
              value={addedBy}
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
                      key={item}
                      value={item}
                    >
                      {item}
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
              value={dueDate}
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
              value={remarks}
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
                  : "Save Task"
              }
            </Button>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}