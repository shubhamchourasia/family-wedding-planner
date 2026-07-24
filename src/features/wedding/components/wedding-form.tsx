"use client";

import { useEffect, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CalendarDays,
  Heart,
  MapPin,
  ScrollText,
  Users,
} from "lucide-react";

import {
  weddingSchema,
  type WeddingFormInput,
} from "../schemas/wedding.schema";

import { createWeddingAction } from "../actions/create-wedding";
import { updateWeddingAction } from "../actions/update-wedding";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WeddingFormProps {
  wedding?: {
    id: string;
    title: string;
    brideName: string;
    groomName: string;
    startDate: Date;
    location: string | null;
    description: string | null;
  };
  onSuccess?: () => void;
}

export function WeddingForm({
  wedding,
  onSuccess,
}: WeddingFormProps) {

  const [isPending, startTransition] = useTransition();

  const form = useForm<WeddingFormInput>({
    resolver: zodResolver(weddingSchema),
    defaultValues: {
      title: "",
      brideName: "",
      groomName: "",
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!wedding) return;

    form.reset({
      title: wedding.title,
      brideName: wedding.brideName,
      groomName: wedding.groomName,
      location: wedding.location ?? "",
      description: wedding.description ?? "",
      startDate: new Date(wedding.startDate)
        .toISOString()
        .split("T")[0],
    } as WeddingFormInput);
  }, [wedding, form]);

  function onSubmit(values: WeddingFormInput) {

    startTransition(async () => {

      const result = wedding
        ? await updateWeddingAction(wedding.id, values)
        : await createWeddingAction(values);

      if (!result.success) {
        console.error(result.error);
        return;
      }

      form.reset();
      onSuccess?.();

    });

  }

  return (

    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div>

        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Heart className="h-5 w-5 text-rose-500" />
          Wedding Details
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter the basic information about your wedding.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <Label className="mb-2 flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Wedding Title
          </Label>

          <Input
            placeholder=""
            {...form.register("title")}
          />

          {form.formState.errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}

        </div>

        <div>

          <Label className="mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>

          <Input
            placeholder=""
            {...form.register("location")}
          />

          {form.formState.errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.location.message}
            </p>
          )}

        </div>

        <div>

          <Label className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Bride Name
          </Label>

          <Input
            placeholder=""
            {...form.register("brideName")}
          />

          {form.formState.errors.brideName && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.brideName.message}
            </p>
          )}

        </div>

        <div>

          <Label className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Groom Name
          </Label>

          <Input
            placeholder=""
            {...form.register("groomName")}
          />

          {form.formState.errors.groomName && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.groomName.message}
            </p>
          )}

        </div>

        <div>

          <Label className="mb-2 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Wedding Date
          </Label>

          <Input
            type="date"
            {...form.register("startDate")}
          />

          {form.formState.errors.startDate && (
            <p className="mt-1 text-sm text-red-500">
              {String(form.formState.errors.startDate.message)}
            </p>
          )}

        </div>

      </div>

      <div>

        <Label className="mb-2">
          Description
        </Label>

        <Textarea
          rows={4}
          placeholder="Add notes about ceremonies, venue, or planning..."
          {...form.register("description")}
        />

        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}

      </div>

      <div className="flex justify-end gap-3 border-t pt-5">

        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? wedding
              ? "Updating..."
              : "Creating..."
            : wedding
              ? "Update Wedding"
              : "Create Wedding"}
        </Button>

      </div>

    </form>

  );

}