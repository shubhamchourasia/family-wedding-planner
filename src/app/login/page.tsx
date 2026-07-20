"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function LoginPage() {
    return (
        <>
            <Navbar />

            <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-amber-50 via-[#fff9ed] to-stone-50 px-6">
                <div className="w-full max-w-md rounded-2xl border border-amber-100 bg-[#fffdf8] p-8 shadow-lg">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="mb-3 rounded-full bg-amber-100 p-3">
                            <Heart className="h-8 w-8 fill-amber-700 text-amber-700" />
                        </div>

                        <p className="mt-2 text-center text-sm text-gray-500">
                            Login to continue planning your family's wedding.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <Input
                                type="text"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <Input
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-amber-700 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            className="w-full rounded-full border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:text-amber-900"
                        >
                            Login
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="mx-4 text-sm text-gray-400">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Signup */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-amber-700 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}