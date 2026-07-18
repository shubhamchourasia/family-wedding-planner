"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  updateOverallBudgetAction,
} from "../actions/update-overall-budget";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";


interface OverallBudgetCardProps {
  weddingId: string;
  overallBudget: number | null;
}


export function OverallBudgetCard({
  weddingId,
  overallBudget,
}: OverallBudgetCardProps) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    value,
    setValue,
  ] = useState(
    overallBudget ?? 0
  );

  const [
    pending,
    startTransition,
  ] = useTransition();


  function saveBudget() {

    startTransition(
      async () => {

        const result =
          await updateOverallBudgetAction(
            weddingId,
            value
          );

        if (
          result.success
        ) {
          setOpen(false);
        }

      }
    );

  }


  if (!open) {

    return (
      <Button
        variant="outline"
        onClick={() =>
          setOpen(true)
        }
      >
        {
          overallBudget
            ? "Update Overall Budget"
            : "Set Overall Budget"
        }
      </Button>
    );

  }


  return (
    <div className="flex items-center gap-2">

      <Input
        type="number"
        value={
          value
        }
        onChange={(event) =>
          setValue(
            Number(
              event.target.value
            )
          )
        }
        placeholder="Overall Budget"
        className="w-44"
      />

      <Button
        size="sm"
        disabled={
          pending
        }
        onClick={
          saveBudget
        }
      >
        {
          pending
            ? "Saving..."
            : "Save"
        }
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          setOpen(false)
        }
      >
        Cancel
      </Button>

    </div>
  );
}