"use client";

import {
  memo,
} from "react";


const tabs = [
  "Overview",
  "Events",
  "Guests",
  "Budget",
  "Vendors",
  "Tasks",
  "Documents",
] as const;


export type WeddingTab =
  (typeof tabs)[number];


interface WeddingTabsProps {

  activeTab: WeddingTab;

  onChange: (
    tab: WeddingTab
  ) => void;

}


function WeddingTabs({
  activeTab,
  onChange,
}: WeddingTabsProps) {

  return (

    <div
      className="
        overflow-x-auto
      "
    >

      <div
        className="
          flex
          gap-2
          rounded-xl
          border
          border-amber-100
          bg-[#fffdf8]
          p-2
        "
      >

        {
          tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={
                activeTab === tab
                  ? "rounded-lg bg-amber-700 px-5 py-2 text-white shadow-sm transition"
                  : "rounded-lg px-5 py-2 text-stone-600 transition hover:bg-amber-50 hover:text-amber-800"
              }
            >

              {tab}

            </button>

          ))
        }

      </div>

    </div>

  );

}


export default memo(WeddingTabs);
export {
  WeddingTabs,
};