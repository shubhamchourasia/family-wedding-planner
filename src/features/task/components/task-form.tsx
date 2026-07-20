"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TaskAddedBy,
  TaskCategory,
} from "@prisma/client";

import {
  taskSchema,
  type TaskInput,
} from "../schemas/task.schema";

import {
  createTaskAction,
} from "../actions/create-task";

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
  Textarea,
} from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormProps {
  weddingId: string;
  taskListId?: string;
  mode: "create" | "edit";
  task?: {
    id: string;
    title: string;
    category: string;
    addedBy: string;
    dueDate: Date | null;
    remarks: string | null;
  };
  onSuccess?: () => void;
}

export function TaskForm({
  weddingId,
  taskListId,
  mode,
  task,
  onSuccess,
}: TaskFormProps) {

  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      category:
        (task?.category as TaskCategory) ??
        TaskCategory.GENERAL,
      addedBy:
        (task?.addedBy as TaskAddedBy) ??
        TaskAddedBy.SHUBHAM,
      dueDate: task?.dueDate ?? null,
      remarks: task?.remarks ?? "",
    },
  });

  const category = watch("category");
  const addedBy = watch("addedBy");

  function onSubmit(values: TaskInput) {

    startTransition(async () => {

      let result;

      if (mode === "create") {

        result =
          await createTaskAction(
            weddingId,
            taskListId!,
            {
              ...values,
              dueDate:
                values.dueDate ?? null,
              remarks:
                values.remarks ?? null,
            }
          );

      } else {

        result =
          await updateTaskAction(
            weddingId,
            task!.id,
            {
              ...values,
              dueDate:
                values.dueDate ?? null,
              remarks:
                values.remarks ?? null,
            }
          );

      }

      if (!result.success) {
        console.error(result.error);
        return;
      }

      onSuccess?.();

    });

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <Input
        placeholder="Task title"
        {...register("title")}
      />

      <Select
        value={category}
        onValueChange={(value) =>
          setValue(
            "category",
            value as TaskCategory
          )
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Object.values(
            TaskCategory
          ).map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={addedBy}
        onValueChange={(value) =>
          setValue(
            "addedBy",
            value as TaskAddedBy
          )
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Object.values(
            TaskAddedBy
          ).map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        {...register("dueDate", {
          valueAsDate: true,
        })}
      />

      <Textarea
        placeholder="Remarks"
        {...register("remarks")}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {mode === "create"
          ? "Create Task"
          : "Update Task"}
      </Button>

    </form>
  );
}