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

  weddingId:string;

  tasks:Array<{

    id:string;

    title:string;

    category:TaskCategory;

    addedBy:TaskAddedBy;

    dueDate:Date|null;

    completed:boolean;

    remarks:string|null;

  }>;

  onRefresh?:()=>void | Promise<void>;

}



function formatDate(
  date:Date|null
){

  if(!date){
    return "-";
  }


  return new Date(date)
    .toLocaleDateString(
      "en-IN",
      {
        day:"2-digit",
        month:"short",
        year:"numeric",
      }
    );

}



export function TaskTable({

  weddingId,
  tasks,
  onRefresh,

}:TaskTableProps){



  async function handleToggle(
    taskId:string
  ){

    const result =
      await toggleTaskStatusAction(
        weddingId,
        taskId
      );


    if(result.success){

      onRefresh?.();

    }

  }



  if(tasks.length===0){

    return (

      <div
        className="
          rounded-xl
          border
          border-dashed
          border-amber-200
          p-10
          text-center
          text-stone-500
        "
      >

        No tasks added yet.

      </div>

    );

  }



  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-amber-100
        workspace-card
        shadow-sm
      "
    >


      <div className="overflow-x-auto">


        <table className="min-w-full">


          <thead
            className="
              border-b
              border-amber-200
              bg-gradient-to-r
              from-[#fff8e7]
              via-amber-50
              to-[#fffdf8]
            "
          >

            <tr
              className="
                text-sm
                font-bold
                uppercase
                tracking-wide
                text-stone-600
              "
            >

              <th className="px-6 py-4 text-left">
                Status
              </th>


              <th className="px-6 py-4 text-left">
                Task
              </th>


              <th className="px-6 py-4 text-left">
                Category
              </th>


              <th className="px-6 py-4 text-left">
                Due Date
              </th>


              <th className="px-6 py-4 text-left">
                Added By
              </th>


              <th className="px-6 py-4 text-left">
                Remarks
              </th>


              <th className="px-6 py-4 text-center">
                Actions
              </th>


            </tr>


          </thead>



          <tbody>


            {
              tasks.map(
                task=>(


                  <tr

                    key={
                      task.id
                    }

                    className="
                      border-b
                      border-amber-100/70
                      hover:bg-amber-50/50
                    "

                  >



                    <td className="px-6 py-5">


                      <button

                        onClick={()=>
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
                          ${
                            task.completed
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-800"
                          }
                        `}

                      >


                        {
                          task.completed

                          ? (
                            <>
                              <CheckCircle2
                                className="h-4 w-4"
                              />

                              Done
                            </>
                          )

                          : (

                            <>
                              <ListTodo
                                className="h-4 w-4"
                              />

                              To Do
                            </>

                          )

                        }


                      </button>


                    </td>




                    <td className="px-6 py-5">

                      <div
                        className="
                          font-semibold
                          text-stone-900
                        "
                      >

                        {task.title}

                      </div>

                    </td>




                    <td className="px-6 py-5">


                      <span
                        className="
                          rounded-full
                          bg-purple-50
                          px-3
                          py-1
                          text-xs
                          text-purple-700
                        "
                      >

                        {task.category}

                      </span>


                    </td>




                    <td className="px-6 py-5">

                      {formatDate(
                        task.dueDate
                      )}

                    </td>




                    <td className="px-6 py-5">


                      <span
                        className="
                          rounded-full
                          bg-amber-50
                          px-3
                          py-1
                          text-xs
                          text-amber-800
                        "
                      >

                        {task.addedBy}

                      </span>


                    </td>




                    <td className="max-w-sm px-6 py-5">


                      <div className="truncate">

                        {
                          task.remarks || "-"
                        }

                      </div>


                    </td>




                    <td className="px-6 py-5">


                      <div
                        className="
                          flex
                          justify-center
                          gap-2
                        "
                      >


                        <EditTaskDialog

                          weddingId={
                            weddingId
                          }

                          task={
                            task
                          }

                          onSuccess={
                            onRefresh
                          }

                        />



                        <DeleteTaskDialog

                          weddingId={
                            weddingId
                          }

                          taskId={
                            task.id
                          }

                          taskTitle={
                            task.title
                          }

                          onSuccess={
                            onRefresh
                          }

                        />


                      </div>


                    </td>



                  </tr>


                )
              )
            }



          </tbody>


        </table>


      </div>


    </div>


  );

}