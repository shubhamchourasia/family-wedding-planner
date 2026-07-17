"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  guestSchema,
  type GuestInput,
  type GuestFormInput,
} from "../schemas/guest.schema";

import {
  createGuestAction,
} from "../actions/create-guest";

import {
  updateGuestAction,
} from "../actions/update-guest";

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

interface GuestFormProps {
  weddingId: string;
  mode?: "create" | "edit";
  guest?: {
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    side: GuestInput["side"];
    food: GuestInput["food"];
    relation: string | null;
    city: string | null;
    notes: string | null;
  };
  onSuccess?: () => void;
}

const GUEST_SIDES = [
  "BRIDE",
  "GROOM",
  "BOTH",
] as const;

const FOOD_OPTIONS = [
  "VEG",
  "NON_VEG",
  "JAIN",
  "VEGAN",
] as const;

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export function GuestForm({
  weddingId,
  mode = "create",
  guest,
  onSuccess,
}: GuestFormProps) {

  const [isPending, startTransition] = useTransition();

  const form = useForm<
    GuestFormInput,
    unknown,
    GuestInput
  >({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      fullName: guest?.fullName ?? "",
      phone: guest?.phone ?? "",
      email: guest?.email ?? "",
      side: guest?.side ?? "BOTH",
      food: guest?.food ?? undefined,
      relation: guest?.relation ?? "",
      city: guest?.city ?? "",
      notes: guest?.notes ?? "",
    },
  });

  function onSubmit(values: GuestInput) {
    startTransition(async () => {

      const result =
        mode === "edit" && guest
          ? await updateGuestAction(
              guest.id,
              values
            )
          : await createGuestAction(
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
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormSection
        title="Guest Information"
        description="Basic details of the guest."
      >
        <FormGrid>
          <FormField
            label="👤 Full Name"
            required
            error={form.formState.errors.fullName?.message}
          >
            <Input
              className="h-11"
              placeholder="Rahul Dua"
              {...form.register("fullName")}
            />
          </FormField>

          <FormField label="📱 Phone">
            <Input
              className="h-11"
              placeholder="+91 9876543210"
              {...form.register("phone")}
            />
          </FormField>

          <FormField
            label="📧 Email"
            error={form.formState.errors.email?.message}
          >
            <Input
              className="h-11"
              placeholder="rahul@email.com"
              {...form.register("email")}
            />
          </FormField>

          <FormField label="👨‍👩‍👧 Side">
            <Select
              value={form.watch("side")}
              onValueChange={(value) =>
                form.setValue(
                  "side",
                  value as GuestInput["side"],
                  {
                    shouldValidate: true,
                  }
                )
              }
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select side" />
              </SelectTrigger>

              <SelectContent>
                {GUEST_SIDES.map((side) => (
                  <SelectItem
                    key={side}
                    value={side}
                  >
                    {formatLabel(side)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="🥗 Food Preference">
            <Select
              value={form.watch("food") ?? ""}
              onValueChange={(value) =>
                form.setValue(
                  "food",
                  value as GuestInput["food"],
                  {
                    shouldValidate: true,
                  }
                )
              }
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Optional" />
              </SelectTrigger>

              <SelectContent>
                {FOOD_OPTIONS.map((food) => (
                  <SelectItem
                    key={food}
                    value={food}
                  >
                    {formatLabel(food)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="🤝 Relation">
            <Input
              className="h-11"
              placeholder="Friend"
              {...form.register("relation")}
            />
          </FormField>

          <FormField label="🏙 City">
            <Input
              className="h-11"
              placeholder="Bengaluru"
              {...form.register("city")}
            />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Additional Notes"
        description="Optional information."
      >
        <FormField label="📝 Notes">
          <Textarea
            rows={4}
            className="resize-none"
            {...form.register("notes")}
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
              ? "Updating Guest..."
              : "Adding Guest..."
            : mode === "edit"
              ? "Update Guest"
              : "Add Guest"}
        </Button>
      </FormActions>
    </form>
  );
}