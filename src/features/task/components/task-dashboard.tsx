"use client";

import {
  CreateTaskListDialog,
} from "./create-task-list-dialog";

import {
  TaskListCard,
} from "./task-list-card";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";


interface TaskDashboardProps {

  weddingId: string;

  taskLists: Array<{
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

  }>;

  onRefresh?: () => void | Promise<void>;

}



export function TaskDashboard({
  weddingId,
  taskLists,
  onRefresh,
}: TaskDashboardProps) {


  return (

    <div className="space-y-6">


      <div
        className="
          flex
          items-center
          justify-between
          px-2
        "
      >


        <div>

          <h2
            className="
              pl-2
              text-2xl
              font-bold
              text-stone-900
            "
          >
            Task Management
          </h2>


          <p
            className="
              pl-2
              text-gray-500
            "
          >
            Manage wedding tasks, responsibilities and progress.
          </p>


        </div>



        <CreateTaskListDialog

          weddingId={
            weddingId
          }

          onSuccess={
            onRefresh
          }

        />


      </div>




      {
        taskLists.length === 0 ? (

          <div
            className="
              rounded-xl
              border
              p-6
              text-sm
              text-muted-foreground
            "
          >
            No task lists created yet.
          </div>

        ) : (

          taskLists.map(
            (
              taskList
            ) => (

              <TaskListCard

                key={
                  taskList.id
                }

                weddingId={
                  weddingId
                }

                taskList={
                  taskList
                }

                onRefresh={
                  onRefresh
                }

              />

            )
          )

        )
      }


    </div>

  );

}