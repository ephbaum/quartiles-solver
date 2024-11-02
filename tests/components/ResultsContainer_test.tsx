import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/assert/mod.ts";
import ResultsContainer from "../../components/ResultsContainer.tsx";
import { WordResult } from "../../types.ts";

const mockResults: WordResult[] = [
  {
    word: "baked",
    parts: [
      { part: "bak", order: 1 },
      { part: "ed", order: 2 },
    ],
  },
  {
    word: "free",
    parts: [
      { part: "fre", order: 1 },
      { part: "e", order: 2 },
    ],
  },
];

describe("ResultsContainer component tests", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should display results correctly", () => {
    const { container } = render(
      <ResultsContainer results={mockResults} error="" showResults={true} />,
    );
    const spans = container.querySelectorAll("span span");
    assertEquals(spans.length, 4);
    assertEquals(spans[0].textContent, "bak");
    assertEquals(spans[1].textContent, "ed");
    assertEquals(spans[2].textContent, "fre");
    assertEquals(spans[3].textContent, "e");
  });

  it("should handle errors correctly", () => {
    const { container } = render(
      <ResultsContainer
        results={[]}
        error="An error occurred"
        showResults={true}
      />,
    );
    const errorParagraph = container.querySelector("p");
    assertEquals(errorParagraph?.textContent, "An error occurred");
  });
});
