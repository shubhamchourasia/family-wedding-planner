"use client";

import {
  Search,
  X,
} from "lucide-react";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";


interface DataTableToolbarProps {

  search: string;

  onSearchChange: (
    value: string
  ) => void;

  categories?: string[];

  categoryFilter?: string;

  onCategoryChange?: (
    value: string
  ) => void;

}


export function DataTableToolbar({
  search,
  onSearchChange,
  categories = [],
  categoryFilter = "",
  onCategoryChange,
}: DataTableToolbarProps) {

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">

      <div className="relative w-full max-w-sm">

        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={
            search
          }
          placeholder="Search..."
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          className="pl-10 pr-10"
        />


        {
          search && (

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() =>
                onSearchChange("")
              }
            >

              <X
                className="h-4 w-4"
              />

            </Button>

          )
        }

      </div>


      {
        categories.length > 0 && (

          <select
            className="h-10 rounded-md border px-3 text-sm"
            value={
              categoryFilter
            }
            onChange={(event) =>
              onCategoryChange?.(
                event.target.value
              )
            }
          >

            <option value="">
              All Categories
            </option>


            {
              categories.map(
                (
                  category
                ) => (

                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {
                      category
                    }
                  </option>

                )
              )
            }

          </select>

        )
      }

    </div>
  );

}