import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import {
    Users,
    Wallet,
    ClipboardList,
    Camera,
    Sparkles,
    HeartHandshake,
    CalendarDays,
    HandHeart,
} from "lucide-react";


export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-amber-50 via-[#fff9ed] to-white">

                <section className="mx-auto max-w-6xl px-6 py-16">


                    {/* Hero */}
                    <div className="text-center">

                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 shadow-sm">
                            <HeartHandshake className="h-12 w-12 text-amber-700" />
                        </div>


                        <h1 className="mt-8 text-5xl font-bold text-amber-950">
                            Family Wedding Planner
                        </h1>


                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-600">

                            A beautifully crafted wedding planning workspace designed to
                            bring families together, simplify coordination, and make every
                            wedding journey more memorable.

                        </p>
                    </div>

                    {/* Features */}

                    <div className="mt-16 grid gap-8 md:grid-cols-2">


                        {[
                            {
                                icon: Users,
                                title: "Guest Management",
                                description:
                                    "Organize guest lists, family groups, invitations, RSVP tracking, accommodation, transportation, and contact details for both bride and groom families."
                            },
                            {
                                icon: Wallet,
                                title: "Smart Budget Management",
                                description:
                                    "Track estimated costs, actual expenses, vendor payments, pending balances, and maintain complete visibility of your wedding finances."
                            },
                            {
                                icon: ClipboardList,
                                title: "Planning & Checklists",
                                description:
                                    "Manage ceremonies, tasks, shopping lists, required items, vendors, and important documents through one collaborative workspace."
                            },
                            {
                                icon: Camera,
                                title: "Creative Inspirations",
                                description:
                                    "Save ideas for decorations, mandap designs, outfits, photography poses, stage setups, and everything that makes your celebrations unique."
                            },
                        ].map((feature) => {

                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="
                                        rounded-2xl
                                        border
                                        border-amber-100
                                        bg-[#fffdf8]
                                        p-8
                                        shadow-sm
                                        transition
                                        hover:-translate-y-1
                                        hover:shadow-lg
                                    "
                                >

                                    <Icon className="mb-5 h-10 w-10 text-amber-700" />


                                    <h2 className="text-2xl font-semibold text-stone-900">
                                        {feature.title}
                                    </h2>


                                    <p className="mt-3 leading-7 text-stone-600">
                                        {feature.description}
                                    </p>

                                </div>
                            );

                        })}


                    </div>



                    {/* Vision */}

                    <div
                        className="
                            mt-20
                            rounded-3xl
                            border
                            border-amber-200
                            bg-gradient-to-r
                            from-amber-100/70
                            to-[#fff8e7]
                            p-10
                            shadow-sm
                        "
                    >

                        <div className="flex items-center gap-3">

                            <Sparkles className="h-8 w-8 text-amber-700" />


                            <h2 className="text-3xl font-bold text-amber-950">
                                Our Vision
                            </h2>

                        </div>


                        <p className="mt-6 text-lg leading-8 text-stone-700">

                            <strong>
                                Family Wedding Planner
                            </strong>{" "}
                            was envisioned by{" "}
                            <strong>
                                Aakriti Salampuria
                            </strong>{" "}
                            and developed by{" "}
                            <strong>
                                Shubham Chourasia
                            </strong>{" "}
                            and{" "}
                            <strong>
                                Muskan Salampuria
                            </strong>{" "}
                            with a simple goal — making wedding planning effortless,
                            organized, and enjoyable for every family.

                        </p>


                        <p className="mt-5 leading-8 text-stone-600">

                            The platform brings together guests, budgets, wedding events,
                            vendors, shopping requirements, documents, decoration ideas,
                            and photography inspirations into one centralized workspace.

                            🤝 It empowers families to collaborate seamlessly, stay
                            organized, reduce last-minute stress, and spend more time
                            celebrating the beautiful moments that make weddings special.

                        </p>


                    </div>



                    {/* Closing */}

                    <div className="mt-16 text-center">

                        <HandHeart className="mx-auto h-10 w-10 text-amber-700" />

                    </div>


                </section>

            </main>


            <Footer />

        </>
    );
}