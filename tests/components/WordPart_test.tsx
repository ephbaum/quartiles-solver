import { h as _h } from "preact";
import { assertEquals } from "$std/assert/assert_equals.ts";
import { render } from "@testing-library/preact";
import WordPart from "../../components/WordPart.tsx";
import { WordPart as WordPartType } from "../../types.ts";

const mockWordPart: WordPartType = {
  part: "bak",
  order: 1,
};

Deno.test("WordPart component renders the word part correctly", () => {
  const { container } = render(<WordPart part={mockWordPart} />);
  const span = container.querySelector("span");
  assertEquals(span?.textContent, "bak");
});
