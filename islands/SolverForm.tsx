import { h as _h } from "preact";
import { useState } from "preact/hooks";
import FormHeader from "../components/FormHeader.tsx";

interface SolverFormProps {
  onSubmit: (jsonData: Record<string, string>) => Promise<void>;
  isLoading: boolean;
}

const SolverForm = ({ onSubmit, isLoading }: SolverFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target as HTMLFormElement);
    const jsonData: Record<string, string> = {};
    formData.forEach((value, key) => {
      jsonData[key] = value as string;
    });

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
      <FormHeader />
      <form class="space-y-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 rounded w-full h-auto"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Solve"}
        </button>
        {errorMessage && <p class="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SolverForm;
