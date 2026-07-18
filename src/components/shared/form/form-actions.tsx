import { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
}

export function FormActions({
  children,
}: FormActionsProps) {
  return (
    <div
      className="
        flex
        justify-end
        gap-3
        border-t
        pt-6
      "
    >
      {children}
    </div>
  );
}