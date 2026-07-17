"use client";

const tabs = [
  "Overview",
  "Events",
  "Guests",
  "Budget",
  "Vendors",
  "Tasks",
  "Documents",
] as const;

export type WeddingTab = (typeof tabs)[number];

interface WeddingTabsProps {
  activeTab: WeddingTab;
  onChange: (tab: WeddingTab) => void;
}

export function WeddingTabs({
  activeTab,
  onChange,
}: WeddingTabsProps) {
  return (
    <div className="overflow-x-auto">

      <div className="flex gap-2 rounded-xl border bg-white p-2">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={
              activeTab === tab
                ? "rounded-lg bg-rose-700 px-5 py-2 text-white transition"
                : "rounded-lg px-5 py-2 text-gray-600 transition hover:bg-gray-100"
            }
          >
            {tab}
          </button>

        ))}

      </div>

    </div>
  );
}