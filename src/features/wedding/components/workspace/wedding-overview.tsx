interface WeddingOverviewProps {
  wedding: any;
}

export function WeddingOverview({
  wedding,
}: WeddingOverviewProps) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-amber-100
        workspace-card
        p-4
        shadow-sm
      "
    >

      <div>

        <p className="text-lg text-stone-600">
          Welcome to{" "}
          <span className="font-semibold text-stone-800">
            {wedding.title}
          </span>
          .
        </p>

      </div>


      <div className="mt-4 grid gap-4 md:grid-cols-3">


        <div
          className="
            rounded-xl
            border
            border-amber-100
            bg-[#fffdf8]
            p-3
          "
        >

          <p className="text-sm font-medium text-stone-500">
            Couple
          </p>

          <p className="mt-1 text-lg font-semibold text-stone-900">
            {wedding.brideName} ❤️ {wedding.groomName}
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-amber-100
            bg-[#fffdf8]
            p-3
          "
        >

          <p className="text-sm font-medium text-stone-500">
            Guests
          </p>

          <p className="mt-1 text-2xl font-bold text-stone-900">
            {wedding.guests?.length ?? 0}
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-amber-100
            bg-[#fffdf8]
            p-3
          "
        >

          <p className="text-sm font-medium text-stone-500">
            Events
          </p>

          <p className="mt-1 text-2xl font-bold text-stone-900">
            {wedding.events?.length ?? 0}
          </p>

        </div>


      </div>


      {wedding.description && (

        <div
          className="
            mt-4
            rounded-xl
            border
            border-amber-100
            bg-amber-50/50
            p-3
          "
        >

          <p className="text-sm font-semibold text-stone-700">
            About Wedding
          </p>

          <p className="mt-1 text-stone-600">
            {wedding.description}
          </p>

        </div>

      )}


    </div>
  );
}