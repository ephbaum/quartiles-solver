import { h as _h } from "preact";
import { WordResult } from "../types.ts";
import WordPart from "./WordPart.tsx";

interface ResultProps {
  result: WordResult;
}

export default function Result({ result }: ResultProps) {
  return (
    <p>
      {result.parts.map((part, index) => (
        <WordPart key={index} part={part} />
      ))}
    </p>
  );
}
