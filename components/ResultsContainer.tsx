import { h as _h } from "preact";
import { WordResult } from "../types.ts";
import Result from "./Result.tsx";

interface ResultsContainerProps {
  results: WordResult[];
  error: string;
  showResults: boolean;
}

export default function ResultsContainer(
  { results, error, showResults }: ResultsContainerProps,
) {
  if (!showResults) return null;

  return (
    <div
      id="results-container"
      class="bg-white p-4 rounded shadow-md w-auto max-w-xl"
    >
      <h2 class="text-1xl font-bold mb-4 text-center">Results</h2>
      {error && <p class="text-red-500">{error}</p>}
      <div class="flex flex-col space-y-4">
        {results.map((result, index) => (
          <div key={index} class="p-2 border-b border-gray-200">
            <Result result={result} />
          </div>
        ))}
      </div>
    </div>
  );
}
