import { PrdForm } from "../components/PrdForm";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 sm:px-6 lg:px-8">
      <main className="w-full max-w-4xl mx-auto px-5 sm:px-6">
        <button className="p-4 font-mono font-bold h-14 flex-none rounded-lg flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 w-full mb-8 mt-16">
          Try with a sample requirement
        </button>

        <div className="grid grid-cols-2">
          <PrdForm />
        </div>
      </main>
    </div>
  );
};
