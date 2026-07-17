interface WeddingOverviewProps {
  wedding: any;
}

export function WeddingOverview({
  wedding,
}: WeddingOverviewProps) {

  return (

    <div className="rounded-xl border bg-white p-6">

      <h2 className="text-xl font-semibold">
        Wedding Overview
      </h2>

      <p className="mt-3 text-gray-600">
        Welcome to {wedding.title}.
      </p>

    </div>

  );

}