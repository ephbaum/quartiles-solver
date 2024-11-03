import { FreshContext } from "$fresh/server.ts";
import { WordPart, WordResult } from "../../types.ts";

function generatePermutations(
  parts: WordPart[],
  maxLength: number,
): WordResult[] {
  const results: WordResult[] = [];
  const seen = new Set<string>();

  function permute(
    current: WordPart[],
    remaining: WordPart[],
    order: number[],
  ) {
    if (current.length > 0 && current.length <= maxLength) {
      const word = current.map((part) => part.part).join("");
      if (!seen.has(word)) {
        seen.add(word);
        results.push({
          word,
          parts: current.map((part, index) => ({
            part: part.part,
            order: order[index],
          })),
        });
      }
    }
    if (current.length < maxLength) {
      for (let i = 0; i < remaining.length; i++) {
        permute(
          current.concat(remaining[i]),
          remaining.slice(0, i).concat(remaining.slice(i + 1)),
          order.concat(i + 1),
        );
      }
    }
  }

  for (let i = 1; i <= maxLength; i++) {
    permute([], parts, []);
  }

  return results;
}

export const handler = async (req: Request, _ctx: FreshContext) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const jsonData = await req.json();
    const inputs: WordPart[] = [];

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        inputs.push({
          part: jsonData[`input-${rowIndex}-${colIndex}`],
          order: rowIndex * 4 + colIndex + 1,
        });
      }
    }

    const decoder = new TextDecoder("utf-8");
    const raw = await Deno.readFile("static/words_alpha.txt");
    const text = decoder.decode(raw);
    const dictionary = new Set(text.split("\n").map((word) => word.trim()));

    const permutations = generatePermutations(inputs, 4);

    // Deduplicate results based on the word property
    const uniqueResults = Array.from(
      new Map(permutations.map((result) => [result.word, result])).values(),
    );

    const validWords = uniqueResults.filter((result) =>
      dictionary.has(result.word)
    );

    validWords.sort((a, b) => a.word.length - b.word.length);

    return new Response(JSON.stringify({ results: validWords }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ results: [], error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
