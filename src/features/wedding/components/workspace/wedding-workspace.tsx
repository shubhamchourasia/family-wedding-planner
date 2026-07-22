"use client";

import {
  useEffect,
  useState,
} from "react";


import {
  WeddingHeader,
} from "./wedding-header";


import {
  WeddingTabs,
  type WeddingTab,
} from "./wedding-tabs";


import {
  WeddingOverview,
} from "./wedding-overview";


import {
  WeddingEvents,
} from "./wedding-events";


import {
  WeddingGuests,
} from "./wedding-guests";


import {
  WeddingBudget,
} from "@/features/budget/components/wedding-budget";


import {
  TaskDashboard,
} from "@/features/task/components/task-dashboard";


import {
  useWeddingTabData,
} from "@/features/wedding/hooks/use-wedding-tab-data";



interface WeddingWorkspaceProps {

  wedding: {

    id: string;

    title: string;

    brideName: string;

    groomName: string;

    location: string | null;

    startDate: Date;

    description: string | null;

    overallBudget: number | null;

  };

}



export function WeddingWorkspace({
  wedding,
}: WeddingWorkspaceProps) {


  const [
    activeTab,
    setActiveTab,
  ] = useState<WeddingTab>(
    "Overview"
  );



  const {
    data,
    loading,
    loadTab,
  } = useWeddingTabData(
    wedding.id
  );



  useEffect(() => {

    if (
      activeTab !== "Overview"
    ) {

      loadTab(
        activeTab
      );

    }

  }, [
    activeTab,
    loadTab,
  ]);



  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >


      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/images/wedding-bg.jpg')",
        }}
      />



      <div
        className="
          absolute
          inset-0
          bg-[#faf7f2]/65
        "
      />



      <div
        className="
          relative
          z-10
          space-y-6
          px-4
          py-6
        "
      >


        <WeddingHeader
          wedding={wedding}
        />



        <WeddingTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />



        {
          activeTab === "Overview" && (

            <WeddingOverview
              wedding={{
                ...wedding,
              }}
            />

          )
        }



        {
          activeTab === "Events" && (

            loading ? (

              <LoadingCard />

            ) : (

              <WeddingEvents

                wedding={{
                  id: wedding.id,

                  events:
                    data.events,

                }}

              />

            )

          )
        }



        {
          activeTab === "Guests" && (

            loading ? (

              <LoadingCard />

            ) : (

              <WeddingGuests

                weddingId={
                  wedding.id
                }

                events={
                  data.events
                }

                guests={
                  data.guests
                }

              />

            )

          )
        }



        {
          activeTab === "Budget" && (

            loading ? (

              <LoadingCard />

            ) : (

              <WeddingBudget

                weddingId={
                  wedding.id
                }

                overallBudget={
                  wedding.overallBudget
                }

                budgetItems={
                  data.budgetItems
                }

              />

            )

          )
        }



        {
          activeTab === "Tasks" && (

            loading ? (

              <LoadingCard />

            ) : (

              <TaskDashboard

                weddingId={
                  wedding.id
                }

                taskLists={
                  data.taskLists
                }

              />

            )

          )
        }



        {
          activeTab === "Vendors" && (

            <PlaceholderCard
              title="Vendors"
            />

          )
        }



        {
          activeTab === "Documents" && (

            <PlaceholderCard
              title="Documents"
            />

          )
        }



      </div>


    </div>

  );

}



function LoadingCard() {

  return (

    <div
      className="
        rounded-xl
        bg-white
        p-6
        text-center
        text-gray-500
      "
    >

      Loading...

    </div>

  );

}



function PlaceholderCard({
  title,
}: {
  title: string;
}) {

  return (

    <div
      className="
        rounded-xl
        bg-white
        p-6
        text-center
        text-gray-500
      "
    >

      {title} will load here.

    </div>

  );

}