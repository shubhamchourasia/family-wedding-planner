import {
  CalendarDays,
  HandCoins,
  ListTodo,
  Users,
} from "lucide-react";

import PageHeader from "@/components/layout/page-header";
import StatCard from "@/components/layout/stat-card";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your wedding planning overview."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Guests"
          value="0"
          icon={Users}
        />

        <StatCard
          title="Budget Used"
          value="₹0"
          icon={HandCoins}
          color="bg-green-100"
        />

        <StatCard
          title="Upcoming Events"
          value="0"
          icon={CalendarDays}
          color="bg-blue-100"
        />

        <StatCard
          title="Pending Tasks"
          value="0"
          icon={ListTodo}
          color="bg-yellow-100"
        />
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Welcome to Family Wedding Planner 🎉
        </h2>

        <p className="text-gray-600">
          Start by creating your first wedding. Once created, you'll be able
          to manage guests, budgets, events, vendors, accommodation,
          transportation, and much more from a single place.
        </p>
      </div>
    </>
  );
}