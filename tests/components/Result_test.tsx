import { h } from "preact";
import { render } from "@testing-library/preact";
import Result from "../../components/Result.tsx";
import { WordResult } from "../../types.ts";

const mockResult: WordResult = {
  word: "baked",
  parts: [
    { part: "bak", order: 1 },
    { part: "ed", order: 2 },
  ],
};

Deno.test("Result component renders word parts correctly", () => {
  const { container } = render(<Result result={mockResult} />);
  const spans = container.querySelectorAll("span");
  assertEquals(spans.length, 2);
  assertEquals(spans[0].textContent, "bak");
  assertEquals(spans[1].textContent, "ed");
});
