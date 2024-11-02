import { h as _h } from "preact";
import { WordPart as WordPartType } from "../types.ts";

interface WordPartProps {
  part: WordPartType;
}

export default function WordPart({ part }: WordPartProps) {
  return <span>{part.part}</span>;
}
