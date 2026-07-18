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

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (
    value: string
  ) => void;
}

export function SearchInput({
  value,
  placeholder = "Search...",
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">

      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />

      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="pl-10 pr-10"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() =>
            onChange("")
          }
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

    </div>
  );
}