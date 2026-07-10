import {
  getWeddingsAction,
} from "@/features/wedding/actions/get-weddings";

import {
  WeddingGrid,
} from "@/features/wedding/components/wedding-grid";

import PageHeader from "@/components/layout/page-header";


export default async function DashboardPage() {

  const result = await getWeddingsAction();


  const weddings =
    result.success
      ? result.data
      : [];


  return (
    <>

      <PageHeader
        title="Dashboard"
        description="Manage your weddings, guests, events and budgets."
      />


      <section className="mt-8">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">
            Your Weddings
          </h2>


          <p className="text-gray-600">
            All weddings created by you.
          </p>

        </div>


        <WeddingGrid
          weddings={weddings ?? []}
        />


      </section>

    </>
  );
}