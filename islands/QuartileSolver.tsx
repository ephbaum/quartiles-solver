import { h as _h } from "preact";
import { useState } from "preact/hooks";
import ResultsContainer from "../components/ResultsContainer.tsx";
import SolverForm from "./SolverForm.tsx";
import { WordResult } from "../types.ts";

export default function QuartileSolver(
  { results: initialResults, error: _error }: {
    results?: string[];
    error?: string;
  },
) {
  const [results, setResults] = useState<WordResult[]>(
    initialResults?.map((result) => ({ word: result, parts: [] })) || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(_error || "");

  const handleSubmit = async (jsonData: unknown) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      const data = await response.json();
      setResults(data.results);
      if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (_error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center flex-col">
      <SolverForm onSubmit={handleSubmit} isLoading={isLoading} />
      <ResultsContainer
        results={results}
        error={errorMessage}
        showResults={results.length > 0 || !!errorMessage}
      />
    </div>
  );
}
