"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { cn } from "@/lib/utils";

import {
  CheckIcon,
  ChevronDownIcon,
} from "lucide-react";


const Select = SelectPrimitive.Root;


function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {

  return (
    <SelectPrimitive.Value
      className={cn(
        "flex flex-1 items-center text-left",
        className
      )}
      {...props}
    />
  );
}


function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {

  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none",
        "focus:border-rose-500 focus:ring-2 focus:ring-rose-200",
        className
      )}
      {...props}
    >

      {children}

      <ChevronDownIcon
        className="h-4 w-4 text-gray-500"
      />

    </SelectPrimitive.Trigger>
  );
}


function SelectContent({
  className,
  children,
  ...props
}: SelectPrimitive.Popup.Props) {

  return (
    <SelectPrimitive.Portal>

      <SelectPrimitive.Positioner
        sideOffset={6}
        className="z-[99999]"
      >

        <SelectPrimitive.Popup
          className={cn(
            `
            z-[99999]
            min-w-[var(--anchor-width)]
            overflow-hidden
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-900
            shadow-xl
            `,
            className
          )}
          {...props}
        >

          <SelectPrimitive.List
            className="
              max-h-60
              overflow-y-auto
              p-1
            "
          >

            {children}

          </SelectPrimitive.List>


        </SelectPrimitive.Popup>

      </SelectPrimitive.Positioner>

    </SelectPrimitive.Portal>
  );
}


function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {

  return (
    <SelectPrimitive.Item
      className={cn(
        `
        relative
        flex
        cursor-pointer
        items-center
        rounded-md
        px-3
        py-2
        text-sm
        text-gray-800
        outline-none
        hover:bg-gray-100
        data-highlighted:bg-gray-100
        `,
        className
      )}
      {...props}
    >

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>


      <SelectPrimitive.ItemIndicator
        className="
          absolute
          right-3
        "
      >

        <CheckIcon
          className="h-4 w-4"
        />

      </SelectPrimitive.ItemIndicator>


    </SelectPrimitive.Item>
  );
}


export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};