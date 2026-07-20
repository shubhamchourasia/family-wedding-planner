"use client";

import { useState } from "react";

import {
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  TaskForm,
} from "./task-form";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

interface EditTaskDialogProps {
  weddingId: string;

  task: {
    id: string;
    title: string;
    category: TaskCategory;
    addedBy: TaskAddedBy;
    dueDate: Date | null;
    completed: boolean;
    remarks: string | null;
  };

  onSuccess?: () => void;
}

export function EditTaskDialog({
  weddingId,
  task,
  onSuccess,
}: EditTaskDialogProps) {

  const [open, setOpen] =
    useState(false);

  function handleSuccess() {

    setOpen(false);

    onSuccess?.();

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
              hover:bg-gray-100
            "
          >
            <Pencil className="h-4 w-4" />
          </button>
        }
      />

      <DialogContent
        className="
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >

        <DialogHeader>

          <DialogTitle>
            Edit Task
          </DialogTitle>

        </DialogHeader>

        <TaskForm
          weddingId={weddingId}
          mode="edit"
          task={task}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );
}