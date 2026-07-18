"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  eventSchema,
  type EventFormInput,
  type EventInput,
} from "../schemas/event.schema";

import {
  createEventAction,
} from "../actions/create-event";

import {
  updateEventAction,
} from "../actions/update-event";

import {
  FormActions,
  FormField,
  FormGrid,
  FormSection,
} from "@/components/shared/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFormProps {
  weddingId: string;

  mode?: "create" | "edit";

  event?: {
    id: string;
    title: string;
    type: EventInput["type"];
    venue: string | null;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
  };

  onSuccess?: () => void;
}

const EVENT_TYPES = [
  "ENGAGEMENT",
  "HALDI",
  "MEHENDI",
  "SANGEET",
  "WEDDING",
  "RECEPTION",
  "COCKTAIL",
  "OTHER",
] as const;

function toDateTimeLocal(
  value?: Date | null
) {
  if (!value) return "";

  const d = new Date(value);

  const pad = (n: number) =>
    String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(
    d.getMonth() + 1
  )}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function formatEventType(
  type: string
) {
  return type
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export function EventForm({
  weddingId,
  mode = "create",
  event,
  onSuccess,
}: EventFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const form =
    useForm<
      EventFormInput,
      unknown,
      EventInput
    >({
      resolver: zodResolver(
        eventSchema
      ),

      defaultValues: {
        title: event?.title ?? "",
        type: event?.type ?? "HALDI",
        venue: event?.venue ?? "",
        description:
          event?.description ?? "",
        startTime: toDateTimeLocal(
          event?.startTime
        ),
        endTime: toDateTimeLocal(
          event?.endTime
        ),
      },
    });

  function onSubmit(
    values: EventInput
  ) {
    startTransition(async () => {
      const result =
        mode === "edit" && event
          ? await updateEventAction(
              event.id,
              weddingId,
              values
            )
          : await createEventAction(
              weddingId,
              values
            );

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
      onSubmit={form.handleSubmit(
        onSubmit
      )}
      className="space-y-8"
    >
      <FormSection
        title="Basic Information"
        description="Provide the primary details for this ceremony."
      >
        <FormGrid>
          <FormField
            label="🎉 Event Name"
            required
            error={
              form.formState.errors.title
                ?.message
            }
          >
            <Input
              className="h-11"
              placeholder="Haldi Ceremony"
              {...form.register("title")}
            />
          </FormField>

          <FormField
            label="🏷️ Event Type"
          >
            <Select
              value={form.watch("type")}
              onValueChange={(value) =>
                form.setValue(
                  "type",
                  value as EventInput["type"],
                  {
                    shouldValidate: true,
                  }
                )
              }
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select Event Type" />
              </SelectTrigger>

              <SelectContent>
                {EVENT_TYPES.map(
                  (type) => (
                    <SelectItem
                      key={type}
                      value={type}
                    >
                      {formatEventType(
                        type
                      )}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="📍 Venue"
          >
            <Input
              className="h-11"
              placeholder="Grand Palace Jaipur"
              {...form.register("venue")}
            />
          </FormField>

          <FormField
            label="📅 Start Date & Time"
            required
            error={
              form.formState.errors
                .startTime?.message
            }
          >
            <Input
              className="h-11"
              type="datetime-local"
              {...form.register(
                "startTime"
              )}
            />
          </FormField>

          <FormField
            label="⏰ End Date & Time"
          >
            <Input
              className="h-11"
              type="datetime-local"
              {...form.register(
                "endTime"
              )}
            />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Additional Details"
        description="Anything guests or family members should know."
      >
        <FormField
          label="📝 Description"
        >
          <Textarea
            rows={5}
            className="resize-none"
            placeholder="Describe this event..."
            {...form.register(
              "description"
            )}
          />
        </FormField>
      </FormSection>

      <FormActions>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Cancel
        </Button>

        <Button
          size="lg"
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Event"
            : "Create Event"}
        </Button>
      </FormActions>
    </form>
  );
}