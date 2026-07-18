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
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  createTaskListAction,
} from "../actions/create-task-list";

interface CreateTaskListDialogProps {
  weddingId: string;
  onSuccess?: () => void;
}

export function CreateTaskListDialog({
  weddingId,
  onSuccess,
}: CreateTaskListDialogProps) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  async function handleSubmit() {

    const result =
      await createTaskListAction(
        weddingId,
        name
      );

    if (result.success) {

      setName("");

      setOpen(false);

      onSuccess?.();

    }

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
        Add Task List
      </Button>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Task List
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <div className="space-y-2">

            <Label>
              Task List Name
            </Label>

            <Input
              placeholder="Wedding Preparation"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <Button
            onClick={handleSubmit}
          >
            Create
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );

}