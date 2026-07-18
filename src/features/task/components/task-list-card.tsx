"use client";

import {
  CreateTaskDialog,
} from "./create-task-dialog";

import {
  EditTaskDialog,
} from "./edit-task-dialog";

import {
  EditTaskListDialog,
} from "./edit-task-list-dialog";

import {
  DeleteTaskListDialog,
} from "./delete-task-list-dialog";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";


interface TaskListCardProps {
  weddingId: string;
  taskList: {
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
  };
}


export function TaskListCard({
  weddingId,
  taskList,
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


      <div className="space-y-3">

        {
          taskList.tasks.length === 0 ? (

            <div className="rounded-md border p-4 text-sm text-muted-foreground">
              No tasks added yet.
            </div>

          ) : (

            taskList.tasks.map(
              (task) => (

                <div
                  key={task.id}
                  className="rounded-lg border p-4"
                >

                  <div className="flex justify-between gap-4">

                    <div className="space-y-1">

                      <h4 className="font-medium">
                        {task.title}
                      </h4>


                      <p className="text-sm text-muted-foreground">
                        Category: {task.category}
                      </p>


                      <p className="text-sm text-muted-foreground">
                        Added By: {task.addedBy}
                      </p>


                      {
                        task.dueDate && (

                          <p className="text-sm text-muted-foreground">
                            Due Date:{" "}
                            {
                              new Date(
                                task.dueDate
                              ).toLocaleDateString()
                            }
                          </p>

                        )
                      }


                      {
                        task.remarks && (

                          <p className="text-sm text-muted-foreground">
                            Remarks: {task.remarks}
                          </p>

                        )
                      }

                    </div>


                    <EditTaskDialog
                      weddingId={weddingId}
                      task={task}
                    />

                  </div>

                </div>

              )
            )

          )
        }

      </div>


      <div className="flex justify-end">

        <CreateTaskDialog
          weddingId={weddingId}
          taskListId={taskList.id}
        />

      </div>


    </div>
  );
}