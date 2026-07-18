import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
    Users,
    Wallet,
    ClipboardList,
    Camera,
    Sparkles,
    HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
                <section className="mx-auto max-w-6xl px-6 py-16">
                    {/* Hero */}
                    <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
                            <HeartHandshake className="h-10 w-10 text-rose-700" />
                        </div>

                        <h1 className="mt-6 text-5xl font-bold text-rose-900">
                            About Family Wedding Planner
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            Family Wedding Planner is an all-in-one platform designed to make
                            wedding planning simple, organized, and stress-free. It helps
                            families coordinate every aspect of a wedding while keeping
                            everyone informed and connected throughout the celebration.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-md">
                            <Users className="mb-5 h-9 w-9 text-rose-700" />
                            <h2 className="text-2xl font-semibold">Guest Management</h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Maintain guest lists, organize families, manage invitations,
                                RSVP status, accommodation, transportation, contact details,
                                and seating information for both the bride's and groom's
                                families.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-md">
                            <Wallet className="mb-5 h-9 w-9 text-rose-700" />
                            <h2 className="text-2xl font-semibold">Budget Management</h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Track estimated and actual expenses, vendor payments,
                                outstanding balances, and overall wedding budget to ensure
                                expenses stay under control.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-md">
                            <ClipboardList className="mb-5 h-9 w-9 text-rose-700" />
                            <h2 className="text-2xl font-semibold">
                                Planning & Checklists
                            </h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Plan ceremonies, manage tasks, create shopping lists, maintain
                                required item checklists, organize vendors, and keep important
                                wedding documents in one place.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-md">
                            <Camera className="mb-5 h-9 w-9 text-rose-700" />
                            <h2 className="text-2xl font-semibold">
                                Decoration & Photography Inspiration
                            </h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Save inspiration for decorations, mandap designs, stage setups,
                                bridal and groom poses, couple photography, outfits, and other
                                creative ideas to make every ceremony memorable.
                            </p>
                        </div>
                    </div>

                    {/* Developers */}
                    <div className="mt-20 rounded-3xl border border-rose-200 bg-rose-100 p-10 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-8 w-8 text-rose-700" />

                            <h2 className="text-3xl font-bold text-rose-900">
                                Developed By
                            </h2>
                        </div>

                        <p className="mt-6 text-lg leading-8 text-gray-700">
                            <strong>Family Wedding Planner</strong> has been designed and
                            developed by <strong>Shubham Chourasia</strong> and{" "}
                            <strong>Muskan Salampuria</strong> with the vision of making
                            wedding planning effortless for families.
                        </p>

                        <p className="mt-4 leading-8 text-gray-700">
                            The application provides a centralized workspace for managing
                            guests, budgets, wedding events, vendors, shopping lists,
                            required items, important documents, decoration ideas, and
                            photography inspirations for both the bride's and groom's
                            families. It enables everyone involved in the wedding to stay
                            organized, collaborate efficiently, and enjoy a smoother planning
                            experience from start to finish.
                        </p>
                    </div>
                </section>
            </main>
            <Footer/>
        </>

    );
}