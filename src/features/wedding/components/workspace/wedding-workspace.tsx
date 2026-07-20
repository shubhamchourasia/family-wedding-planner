"use client";

import {
  useState,
} from "react";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";


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
  WeddingVendors,
} from "./wedding-vendors";

import {
  WeddingDocuments,
} from "./wedding-documents";

import {
  TaskDashboard,
} from "@/features/task/components/task-dashboard";


interface WeddingWorkspaceProps {

  wedding: {

    id: string;
    title: string;
    brideName: string;
    groomName: string;
    location: string | null;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    overallBudget: number | null;


    guests: any[];

    events: any[];

    budgetItems: any[];

    vendors: any[];

    documents: any[];


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
          bg-[url('/images/wedding-bg.jpg')]
          bg-cover
          bg-center
          opacity-70
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[#faf7f2]/70
        "
      />

      <div
        className="
          relative
          z-10
          space-y-6
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
              wedding={wedding}
            />

          )
        }

        {
          activeTab === "Events" && (

            <WeddingEvents
              wedding={wedding}
            />

          )
        }

        {
          activeTab === "Guests" && (

            <WeddingGuests

              weddingId={
                wedding.id
              }

              events={
                wedding.events
              }

              guests={
                wedding.guests
              }

            />

          )
        }

        {
          activeTab === "Budget" && (

            <WeddingBudget

              weddingId={
                wedding.id
              }

              overallBudget={
                wedding.overallBudget
              }

              budgetItems={
                wedding.budgetItems
              }

            />

          )
        }

        {
          activeTab === "Vendors" && (

            <WeddingVendors />

          )
        }

        {
          activeTab === "Tasks" && (

            <TaskDashboard

              weddingId={
                wedding.id
              }

              taskLists={
                wedding.taskLists
              }

            />

          )
        }

        {
          activeTab === "Documents" && (

            <WeddingDocuments />

          )
        }

      </div>

    </div>

  );

}