"use client";

import {
  CreateTaskListDialog,
} from "./create-task-list-dialog";

import {
  TaskListCard,
} from "./task-list-card";


interface TaskDashboardProps {
  weddingId: string;
  taskLists: Array<{
    id: string;
    name: string;
    tasks: Array<{
      id: string;
      title: string;
      category: string;
      addedBy: string;
      dueDate: Date | null;
      remarks: string | null;
    }>;
  }>;
}


export function TaskDashboard({
  weddingId,
  taskLists,
}: TaskDashboardProps) {

  return (
    <div className="space-y-6">

      <div className="flex justify-end">

        <CreateTaskListDialog
          weddingId={weddingId}
        />

      </div>


      {
        taskLists.length === 0 ? (

          <div className="rounded-xl border p-6 text-sm text-muted-foreground">
            No task lists created yet.
          </div>

        ) : (

          taskLists.map(
            (taskList) => (

              <TaskListCard
                key={taskList.id}
                weddingId={weddingId}
                taskList={taskList}
              />

            )
          )

        )
      }

    </div>
  );
}