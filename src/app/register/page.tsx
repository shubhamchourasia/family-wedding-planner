"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100/30 to-pink-50 px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white px-8 py-5 shadow-lg">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 rounded-full bg-rose-100 p-4">
              <Heart className="h-8 w-8 fill-rose-700 text-rose-700" />
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              Join Family Wedding Planner and start organizing your wedding
              effortlessly.
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="border-rose-200 focus-visible:ring-rose-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                type="text"
                placeholder="Choose a username"
                className="border-rose-200 focus-visible:ring-rose-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-rose-200 focus-visible:ring-rose-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                className="border-rose-200 focus-visible:ring-rose-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                className="border-rose-200 focus-visible:ring-rose-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full border border-rose-200 bg-white text-rose-700 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-800 hover:shadow-md"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-rose-200" />
            <span className="mx-4 text-sm text-gray-400">OR</span>
            <div className="h-px flex-1 bg-rose-200" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-rose-700 transition-colors hover:text-rose-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}