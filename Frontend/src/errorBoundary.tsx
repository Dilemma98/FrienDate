"use client";

import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="text-center mt-20">
      <h2 className="text-2xl font-bold text-red-600">Något gick fel!</h2>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Försök igen
      </button>
    </div>
  );
}

export default ErrorFallback;
