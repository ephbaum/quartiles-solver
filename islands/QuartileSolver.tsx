import { h as _h } from "preact";
import { useState } from "preact/hooks";
import ResultsContainer from "../components/ResultsContainer.tsx";

export default function QuartileSolver({ results: initialResults, error: _error }: { results?: string[], error?: string }) {
  const [results, setResults] = useState(initialResults || []);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(_error || '');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResults(data.results);
      if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (_error) {
      setErrorMessage('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const commonWordParts = [
    ["pre", "post", "un", "re"],
    ["fix", "fix", "fix", "fix"],
    ["ing", "ed", "s", "ly"],
    ["tion", "ment", "ness", "ity"],
    ["able", "ible", "al", "ful"]
  ];

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center flex-col">
      <div id="solver-container" class="bg-white p-4 rounded shadow-md w-auto max-w-xl mb-4">
        <h1 class="text-2xl font-bold mb-4 text-center">Quartiles Solver</h1>
        <form method="POST" action="/" enctype="multipart/form-data" class="space-y-4" onSubmit={handleSubmit}>
          <div class="flex flex-col items-center space-y-2">
            {commonWordParts.map((row, rowIndex) => (
              <div key={rowIndex} class="flex space-x-2">
                {row.map((part, colIndex) => (
                  <input
                    type="text"
                    name={`input-${rowIndex}-${colIndex}`}
                    key={colIndex}
                    defaultValue={part}
                    required
                    class="border border-gray-300 p-2 rounded w-16 text-center"
                  />
                ))}
              </div>
            ))}
          </div>
          <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full h-auto" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Solve'}
          </button>
        </form>
      </div>
        <ResultsContainer results={results} error={errorMessage} showResults={results.length > 0 || !!errorMessage} />
    </div>
  );
}