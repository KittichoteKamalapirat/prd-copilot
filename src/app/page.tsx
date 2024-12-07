"use client";

import Layout from "../components/Layou";
import { PrdForm } from "../components/PrdForm";
import { PrdOutput } from "../components/PrdOutput/PrdOutput";
import { StickyActionBar } from "../components/StickyActionBar";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen bg-white py-8 sm:px-6 lg:px-8">
        {/* Main Content */}
        <main className="flex relative sm:flex-col md: flex-col">
          {/* left */}
          <div className="min-h-screen w-full lg:w-1/2 relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Make Writing PRDs a Breeze with ChatGPT
            </h1>
            <p className="text-gray-500 mb-6">
              Describe the problem your product/service solves. Help the bot
              with top-level information, and let it give you something you can
              build on.
            </p>
            <button className="p-4 font-mono font-bold h-14 flex-none rounded-lg flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 w-full mb-8 mt-16">
              Try with a sample requirement
            </button>

            <PrdForm />
          </div>
          {/* right */}

          <div
            className="relative lg:fixed right-0 bottom-0 lg:block lg:w-1/2 overflow-hidden sm:px-5 lg:h-full h-auto overflow-y-auto top-[64px]"
            style={{
              height: "calc(100vh - 64px)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-white pointer-events-none -z-10"></div>

            <PrdOutput />

            <StickyActionBar />
          </div>
        </main>
      </div>
    </Layout>
  );
}
