import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/assert/mod.ts";
import Result from "../../components/Result.tsx";
import { WordResult } from "../../types.ts";

const mockResult: WordResult = {
  word: "baked",
  parts: [
    { part: "bak", order: 1 },
    { part: "ed", order: 2 },
  ],
};

describe("Result and WordPart components interaction", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should render word parts correctly", () => {
    const { container } = render(<Result result={mockResult} />);
    const spans = container.querySelectorAll("span span");
    assertEquals(spans.length, 2);
    assertEquals(spans[0].textContent, "bak");
    assertEquals(spans[1].textContent, "ed");
  });
});
