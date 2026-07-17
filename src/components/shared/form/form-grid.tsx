import { ReactNode } from "react";

interface FormGridProps {
  children: ReactNode;
}

export function FormGrid({
  children,
}: FormGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
      "
    >
      {children}
    </div>
  );
}