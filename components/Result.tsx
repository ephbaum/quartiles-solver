import { h as _h } from "preact";
import { WordResult } from "../types.ts";
import WordPart from "./WordPart.tsx";

interface ResultProps {
  result: WordResult;
}

export default function Result({ result }: ResultProps) {
  return (
    <div class="mb-4">
      <div class="flex flex-wrap gap-1">
        {result.parts.map((part, index) => (
          <span
            key={index}
            class="bg-gray-100 text-black px-2 py-1 rounded-sm text-sm"
          >
            <WordPart part={part} />
          </span>
        ))}
      </div>
    </div>
  );
}
