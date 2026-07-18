"use client";

import { useState } from "react";

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
  WeddingTasks,
} from "./wedding-tasks";

import {
  WeddingDocuments,
} from "./wedding-documents";

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
    tasks: any[];
    documents: any[];
  };
}

export function WeddingWorkspace({
  wedding,
}: WeddingWorkspaceProps) {
  const [activeTab, setActiveTab] =
    useState<WeddingTab>("Overview");

  return (
    <div className="space-y-6">

      <WeddingHeader
        wedding={wedding}
      />

      <WeddingTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "Overview" && (
        <WeddingOverview
          wedding={wedding}
        />
      )}

      {activeTab === "Events" && (
        <WeddingEvents
          wedding={wedding}
        />
      )}

      {activeTab === "Guests" && (
        <WeddingGuests
          weddingId={wedding.id}
          guests={wedding.guests}
        />
      )}

      {activeTab === "Budget" && (
        <WeddingBudget
          weddingId={wedding.id}
          overallBudget={wedding.overallBudget}
          budgetItems={wedding.budgetItems}
        />
      )}

      {activeTab === "Vendors" && (
        <WeddingVendors />
      )}

      {activeTab === "Tasks" && (
        <WeddingTasks />
      )}

      {activeTab === "Documents" && (
        <WeddingDocuments />
      )}

    </div>
  );
}