"use client";

import {
  CheckCircle2,
  ListTodo,
} from "lucide-react";

import {
  EditTaskDialog,
} from "./edit-task-dialog";

import {
  DeleteTaskDialog,
} from "./delete-task-dialog";

import {
  toggleTaskStatusAction,
} from "../actions/toggle-task-status";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

interface TaskTableProps {
  weddingId: string;

  tasks: Array<{
    id: string;
    title: string;
    category: TaskCategory;
    addedBy: TaskAddedBy;
    dueDate: Date | null;
    completed: boolean;
    remarks: string | null;
  }>;

  onRefresh?: () => void;
}

function formatDate(
  date: Date | null
) {

  if (!date) {
    return "-";
  }

  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}

export function TaskTable({
  weddingId,
  tasks,
  onRefresh,
}: TaskTableProps) {

  async function handleToggle(
    taskId: string
  ) {

    const result =
      await toggleTaskStatusAction(
        weddingId,
        taskId
      );

    if (
      result.success
    ) {
      onRefresh?.();
    }

  }

  if (
    tasks.length === 0
  ) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
        No tasks added yet.
      </div>
    );
  }

  return (

    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 border-b bg-gray-50">

            <tr className="text-xs uppercase tracking-wider text-gray-500">

              <th className="px-6 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Task
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Due Date
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Added By
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Remarks
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tasks.map(
              (task) => (

                <tr
                  key={task.id}
                  className="
                    border-b
                    even:bg-gray-50/40
                    hover:bg-blue-50/40
                    transition-colors
                  "
                >

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        handleToggle(
                          task.id
                        )
                      }
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-sm
                        font-medium
                        transition-all
                        hover:shadow-md
                        ${
                          task.completed
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-blue-200 bg-blue-50 text-blue-700"
                        }
                      `}
                    >

                      {task.completed ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Done
                        </>
                      ) : (
                        <>
                          <ListTodo className="h-4 w-4" />
                          To Do
                        </>
                      )}

                    </button>

                  </td>

                  <td className="px-6 py-4">

                    <div className="font-semibold text-gray-900">
                      {task.title}
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {task.category}
                    </span>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">

                    {formatDate(
                      task.dueDate
                    )}

                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      {task.addedBy}
                    </span>

                  </td>

                  <td className="max-w-sm px-6 py-4 text-gray-600">

                    <div className="truncate">

                      {task.remarks || "-"}

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <EditTaskDialog
                        weddingId={weddingId}
                        task={task}
                        onSuccess={onRefresh}
                      />

                      <DeleteTaskDialog
                        weddingId={weddingId}
                        taskId={task.id}
                        taskTitle={task.title}
                        onSuccess={onRefresh}
                      />

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}