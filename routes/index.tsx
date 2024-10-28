import { h as _h } from "preact";
import { FreshContext, PageProps as _PageProps } from "$fresh/server.ts";
import QuartileSolver from "../islands/QuartileSolver.tsx";

// Function to generate permutations
function generatePermutations(parts: string[], maxLength: number): string[] {
  const results: string[] = [];

  function permute(current: string[], remaining: string[]) {
    if (current.length > 0 && current.length <= maxLength) {
      results.push(current.join(''));
    }
    if (current.length < maxLength) {
      for (let i = 0; i < remaining.length; i++) {
        permute(current.concat(remaining[i]), remaining.slice(0, i).concat(remaining.slice(i + 1)));
      }
    }
  }

  for (let i = 1; i <= maxLength; i++) {
    permute([], parts);
  }

  return results;
}

// Handler function for the route
export const handler = async (req: Request, ctx: FreshContext) => {
  if (req.method !== "POST") {
    return ctx.render({ results: [] });
  }

  try {
    const formData = await req.formData();
    const inputs: string[] = [];

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        inputs.push(formData.get(`input-${rowIndex}-${colIndex}`) as string);
      }
    }

    // Fetch the dictionary file from the URL and read it into a set for fast lookup
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt');
    if (!response.ok) {
      throw new Error('Failed to fetch dictionary file');
    }
    const text = await response.text();
    const dictionary = new Set(text.split('\n').map((word) => word.trim()));

    // Generate permutations of lengths 1 to 4
    const permutations = generatePermutations(inputs, 4);

    // Filter valid words and remove duplicates
    const validWords = [...new Set(permutations.filter((word) => dictionary.has(word)))];

    // Sort valid words by length from smallest to largest
    validWords.sort((a, b) => a.length - b.length);

    return new Response(JSON.stringify({ results: validWords }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error processing request:', error);

    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ results: [], error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default function Page(props: _PageProps) {
  const { results, error } = props.data ?? { results: [], error: null };
  return <QuartileSolver results={results} error={error} />;
}
