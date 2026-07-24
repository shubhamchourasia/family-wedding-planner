"use client";

import {
  useEffect,
  useTransition,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

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



interface TaskFormProps {

  weddingId:string;

  taskListId?:string;

  mode:"create"|"edit";

  task?:{
    id:string;
    title:string;
    category:TaskCategory;
    addedBy:TaskAddedBy;
    dueDate:Date|null;
    remarks:string|null;
  };

  onSuccess?:()=>void;

}



export function TaskForm({

  weddingId,
  taskListId,
  mode,
  task,
  onSuccess,

}:TaskFormProps){


  const [
    pending,
    startTransition,
  ] = useTransition();



  const form =
    useForm<TaskInput>({

      resolver:
        zodResolver(
          taskSchema
        ),

      defaultValues:{

        title:"",

        category:
          TaskCategory.GENERAL,

        addedBy:
          TaskAddedBy.SHUBHAM,

        dueDate:null,

        remarks:"",

      },

    });



  useEffect(()=>{


    if(mode==="edit" && task){

      form.reset({

        title:
          task.title,

        category:
          task.category,

        addedBy:
          task.addedBy,

        dueDate:
          task.dueDate,

        remarks:
          task.remarks ?? "",

      });

    }


  },[
    mode,
    task,
    form,
  ]);




  function onSubmit(
    values:TaskInput
  ){


    startTransition(async()=>{


      let result;


      if(mode==="create"){


        result =
          await createTaskAction(

            weddingId,

            taskListId!,

            values

          );


      } else {


        result =
          await updateTaskAction(

            weddingId,

            task!.id,

            values

          );


      }



      if(result.success){

        onSuccess?.();

      }


    });


  }



  return (

    <form

      onSubmit={
        form.handleSubmit(
          onSubmit
        )
      }

      className="
        space-y-4
      "

    >



      <Input

        placeholder="Task title"

        {...form.register(
          "title"
        )}

      />



      <select

        className="
          h-10
          w-full
          rounded-md
          border
          px-3
        "

        {...form.register(
          "category"
        )}

      >

        {
          Object.values(
            TaskCategory
          ).map(item=>(

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))
        }


      </select>



      <select

        className="
          h-10
          w-full
          rounded-md
          border
          px-3
        "

        {...form.register(
          "addedBy"
        )}

      >

        {
          Object.values(
            TaskAddedBy
          ).map(item=>(

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))
        }

      </select>




      <Input

        type="date"

        {...form.register(
          "dueDate"
        )}

      />




      <Textarea

        placeholder="Remarks"

        {...form.register(
          "remarks"
        )}

      />




      <Button

        type="submit"

        disabled={
          pending
        }

        className="
          w-full
        "

      >

        {
          pending
          ? "Saving..."
          :
          mode==="create"
          ? "Create Task"
          : "Update Task"
        }


      </Button>


    </form>

  );

}