import {
  getWeddingById,
} from "@/features/wedding/services/wedding.service";


import {
  notFound,
} from "next/navigation";


import PageHeader from "@/components/layout/page-header";


interface WeddingPageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function WeddingPage({
  params,
}: WeddingPageProps) {

  const { id } = await params;


  const wedding =
    await getWeddingById(id);


  if (!wedding) {
    notFound();
  }


  return (
    <>

      <PageHeader
        title={wedding.title}
        description={`${wedding.brideName} ❤️ ${wedding.groomName}`}
      />


      <div className="mt-8 grid gap-6 md:grid-cols-3">


        <div className="rounded-2xl border bg-white p-6">

          <h3 className="font-semibold">
            Wedding Date
          </h3>

          <p className="mt-2 text-gray-600">
            {wedding.startDate.toLocaleDateString()}
          </p>

        </div>



        <div className="rounded-2xl border bg-white p-6">

          <h3 className="font-semibold">
            Guests
          </h3>

          <p className="mt-2 text-gray-600">
            {wedding.guests.length}
          </p>

        </div>



        <div className="rounded-2xl border bg-white p-6">

          <h3 className="font-semibold">
            Events
          </h3>

          <p className="mt-2 text-gray-600">
            {wedding.events.length}
          </p>

        </div>


      </div>


      <div className="mt-8 rounded-2xl border bg-white p-6">

        <h2 className="text-xl font-semibold">
          Wedding Overview
        </h2>


        <p className="mt-3 text-gray-600">
          {wedding.description ||
            "No description added yet."
          }
        </p>

      </div>

    </>
  );
}