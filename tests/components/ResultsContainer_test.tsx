import { h } from "preact";
import { render } from "@testing-library/preact";
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

Deno.test("ResultsContainer component displays results correctly", () => {
  const { container } = render(
    <ResultsContainer results={mockResults} error="" showResults={true} />,
  );
  const paragraphs = container.querySelectorAll("p");
  assertEquals(paragraphs.length, 2);
  assertEquals(paragraphs[0].textContent, "baked");
  assertEquals(paragraphs[1].textContent, "free");
});

Deno.test("ResultsContainer component handles errors correctly", () => {
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

Deno.test("ResultsContainer component does not display when showResults is false", () => {
  const { container } = render(
    <ResultsContainer results={mockResults} error="" showResults={false} />,
  );
  const resultsContainer = container.querySelector("#results-container");
  assertEquals(resultsContainer, null);
});
