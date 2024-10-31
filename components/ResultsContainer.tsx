import { h as _h } from "preact";

interface ResultsContainerProps {
  results: string[];
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
      <div class="flex flex-wrap">
        {results.map((result, index) => (
          <li
            key={index}
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 text-center"
          >
            {result}
          </li>
        ))}
      </div>
    </div>
  );
}
