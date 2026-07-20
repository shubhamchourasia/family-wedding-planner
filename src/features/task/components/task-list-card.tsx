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
    <div
      className="
        rounded-2xl
        border
        border-amber-100
        workspace-card
        p-4
        space-y-4
        shadow-sm
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-stone-900">
            {taskList.name}
          </h3>


          <p className="mt-1 text-sm font-medium text-stone-500">
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