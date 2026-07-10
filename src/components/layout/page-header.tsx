interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

        {description && (
          <p className="mt-2 text-gray-600">{description}</p>
        )}
      </div>

      <div className="rounded-2xl border bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-gray-500">Today</p>
        <p className="font-semibold">{today}</p>
      </div>
    </div>
  );
}