import { h as _h } from "preact";
import { assert, assertEquals } from "$std/assert/mod.ts";
import { fireEvent, render, waitFor } from "@testing-library/preact";
import ResultsContainer from "../../components/ResultsContainer.tsx";
import QuartileSolver from "../../islands/QuartileSolver.tsx";
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

Deno.test("QuartileSolver integration test", async () => {
  const { getByText, getByRole, getByLabelText, container } = render(
    <QuartileSolver />,
  );

  // Fill in the form
  const inputElements = container.querySelectorAll("input");
  inputElements.forEach((input, index) => {
    fireEvent.input(input, { target: { value: `part${index}` } });
  });

  // Submit the form
  const submitButton = getByRole("button", { name: /solve/i });
  fireEvent.click(submitButton);

  // Wait for results to be displayed
  await waitFor(() => getByText(/results/i));

  // Check that results are displayed correctly
  const resultsContainer = container.querySelector("#results-container");
  assert(resultsContainer, "Results container should be in the document");

  const paragraphs = resultsContainer?.querySelectorAll("p");
  assert(paragraphs && paragraphs.length > 0, "Paragraphs should be present");

  paragraphs?.forEach((paragraph) => {
    const spans = paragraph.querySelectorAll("span");
    assert(spans.length > 0, "Spans should be present in each paragraph");
  });
});
