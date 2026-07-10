import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";


interface WeddingCardProps {

  wedding: {

    id: string;

    title: string;

    brideName: string;

    groomName: string;

    startDate: Date;

    location?: string | null;

  };

}


export function WeddingCard({
  wedding,
}: WeddingCardProps) {


  return (

    <Link

      href={`/weddings/${wedding.id}`}

      className="
      block
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      transition
      hover:-translate-y-1
      hover:shadow-lg
      "

    >


      <h3 className="text-xl font-semibold">

        {wedding.title}

      </h3>


      <p className="mt-2 text-gray-600">

        💍 {wedding.brideName} & {wedding.groomName}

      </p>


      <div className="mt-5 space-y-3 text-sm text-gray-600">


        <div className="flex items-center gap-2">

          <CalendarDays className="h-4 w-4" />

          <span>

            {
              wedding.startDate.toLocaleDateString()
            }

          </span>

        </div>



        {
          wedding.location && (

            <div className="flex items-center gap-2">

              <MapPin className="h-4 w-4" />

              <span>

                {wedding.location}

              </span>

            </div>

          )
        }



        <div className="flex items-center gap-2">

          <Users className="h-4 w-4" />

          <span>
            Manage Guests
          </span>

        </div>


      </div>


    </Link>

  );
}