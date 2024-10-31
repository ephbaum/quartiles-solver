import { h as _h } from "preact";
import { useState } from "preact/hooks";

interface SolverFormProps {
  onSubmit: (jsonData: any) => Promise<void>;
  isLoading: boolean;
}

export default function SolverForm({ onSubmit, isLoading }: SolverFormProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target as HTMLFormElement);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      await onSubmit(jsonData);
    } catch (_error) {
      setErrorMessage("An error occurred while processing your request.");
    }
  };

  const commonWordParts = [
    ["pre", "post", "un", "re"],
    ["fix", "fix", "fix", "fix"],
    ["ing", "ed", "s", "ly"],
    ["tion", "ment", "ness", "ity"],
    ["able", "ible", "al", "ful"],
  ];

  return (
    <div
      id="solver-container"
      class="bg-white p-4 rounded shadow-md w-auto max-w-xl mb-4"
    >
      <h1 class="text-2xl font-bold mb-4 text-center">Quartiles Solver</h1>
      <form class="space-y-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 rounded w-full h-auto"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Solve"}
        </button>
      </form>
      {errorMessage && <p class="text-red-500">{errorMessage}</p>}
    </div>
  );
}
