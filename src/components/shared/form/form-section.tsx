import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-5">

      <div>

        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}