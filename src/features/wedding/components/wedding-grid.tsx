import {
  WeddingCard,
} from "./wedding-card";


interface WeddingGridProps {

  weddings: Array<{
    id: string;
    title: string;
    brideName: string;
    groomName: string;
    startDate: Date;
    location?: string | null;
  }>;

}


export function WeddingGrid({
  weddings,
}: WeddingGridProps) {


  if (weddings.length === 0) {

    return (

      <div
        className="
        rounded-2xl
        border
        bg-white
        p-10
        text-center
        "
      >

        <h3 className="text-lg font-semibold">
          No weddings yet
        </h3>


        <p className="mt-2 text-gray-500">
          Create your first wedding to start planning.
        </p>


      </div>

    );

  }


  return (

    <div
      className="
      grid
      gap-6
      md:grid-cols-2
      lg:grid-cols-3
      "
    >

      {
        weddings.map((wedding) => (

          <WeddingCard
            key={wedding.id}
            wedding={wedding}
          />

        ))
      }

    </div>

  );
}