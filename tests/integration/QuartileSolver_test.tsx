import { h as _h } from "preact";
import { assert, assertEquals } from "$std/assert/mod.ts";
import { fireEvent, render, waitFor } from "@testing-library/preact";
import QuartileSolver from "../../islands/QuartileSolver.tsx";

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
    assertEquals(spans.length > 0, true);
  });
});
