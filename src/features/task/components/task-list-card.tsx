"use client";

import {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

import {
  CreateTaskDialog,
} from "./create-task-dialog";

import {
  EditTaskListDialog,
} from "./edit-task-list-dialog";

import {
  DeleteTaskListDialog,
} from "./delete-task-list-dialog";

import {
  TaskTable,
} from "./task-table";

interface TaskListCardProps {
  weddingId: string;

  taskList: {
    id: string;
    name: string;

    tasks: Array<{
      id: string;
      title: string;
      category: TaskCategory;
      addedBy: TaskAddedBy;
      dueDate: Date | null;
      completed: boolean;
      remarks: string | null;
    }>;
  };

  onRefresh?: () => void;
}

export function TaskListCard({
  weddingId,
  taskList,
  onRefresh,
}: TaskListCardProps) {

  return (
    <div className="rounded-xl border bg-white p-6 space-y-5">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            {taskList.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {taskList.tasks.length} tasks
          </p>

        </div>

        <div className="flex gap-2">

          <EditTaskListDialog
            weddingId={weddingId}
            taskList={taskList}
          />

          <DeleteTaskListDialog
            weddingId={weddingId}
            taskListId={taskList.id}
          />

        </div>

      </div>

      <TaskTable
        weddingId={weddingId}
        tasks={taskList.tasks}
        onRefresh={onRefresh}
      />

      <div className="flex justify-end">

        <CreateTaskDialog
          weddingId={weddingId}
          taskListId={taskList.id}
          onSuccess={onRefresh}
        />

      </div>

    </div>
  );
}