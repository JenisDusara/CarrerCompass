"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">Oops! लगता है आप जिस पेज की तलाश कर रहे हैं वो मौजूद नहीं है।</p>

      {error && (
        <p className="mt-4 text-red-500 font-medium">
          Error: {error}
        </p>
      )}
    </div>
  );
}
