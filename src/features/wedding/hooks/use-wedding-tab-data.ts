"use client";

import {
  useCallback,
  useState,
} from "react";


import {
  getGuestsAction,
} from "@/features/guest/actions/get-guests";


import {
  getEventsAction,
} from "@/features/event/actions/get-events";


import {
  getBudgetItemsAction,
} from "@/features/budget/actions/get-budget-items";


import {
  getTaskListsAction,
} from "@/features/task/actions/get-task-lists";



interface TabDataState {

  guests: any[];

  events: any[];

  budgetItems: any[];

  taskLists: any[];

}



export function useWeddingTabData(
  weddingId: string
) {


  const [
    data,
    setData,
  ] = useState<TabDataState>({

    guests: [],

    events: [],

    budgetItems: [],

    taskLists: [],

  });



  const [
    loading,
    setLoading,
  ] = useState(false);



  const loadTab = useCallback(

    async (
      tab: string
    ) => {


      setLoading(true);


      try {


        switch(tab) {


          case "Guests": {


            if(data.guests.length)
              break;


            const guests =
              await getGuestsAction(
                weddingId
              );


            setData(
              previous => ({
                ...previous,
                guests,
              })
            );


            break;

          }



          case "Events": {


            if(data.events.length)
              break;


            const result =
              await getEventsAction(
                weddingId
              );


            if(result.success) {

              setData(
                previous => ({
                  ...previous,
                  events:
                    result.data ?? [],
                })
              );

            }


            break;

          }



          case "Budget": {


            if(data.budgetItems.length)
              break;


            const result =
              await getBudgetItemsAction(
                weddingId
              );


            if(result.success) {

              setData(
                previous => ({
                  ...previous,

                  budgetItems:
                    result.data ?? [],

                })
              );

            }


            break;

          }



          case "Tasks": {


            if(data.taskLists.length)
              break;


            const result =
              await getTaskListsAction(
                weddingId
              );


            if(result.success) {

              setData(
                previous => ({
                  ...previous,

                  taskLists:
                    result.data ?? [],

                })
              );

            }


            break;

          }



          default:

            break;


        }


      } finally {


        setLoading(false);


      }


    },

    [
      weddingId,
      data.guests.length,
      data.events.length,
      data.budgetItems.length,
      data.taskLists.length,
    ]

  );



  return {

    data,

    loading,

    loadTab,

  };

}