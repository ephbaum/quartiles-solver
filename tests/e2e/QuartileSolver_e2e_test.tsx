import { h as _h } from "preact";
import { fireEvent, render, waitFor } from "@testing-library/preact";
import { assert, assertEquals } from "$std/assert/mod.ts";
import QuartileSolver from "../../islands/QuartileSolver.tsx";

Deno.test("End-to-end test for QuartileSolver", async () => {
  const { getByText, getByRole, getByLabelText } = render(<QuartileSolver />);

  // Fill in the form inputs
  const inputs = [
    ["pre", "post", "un", "re"],
    ["fix", "fix", "fix", "fix"],
    ["ing", "ed", "s", "ly"],
    ["tion", "ment", "ness", "ity"],
    ["able", "ible", "al", "ful"],
  ];

  inputs.forEach((row, rowIndex) => {
    row.forEach((part, colIndex) => {
      const input = getByLabelText(`input-${rowIndex}-${colIndex}`);
      fireEvent.input(input, { target: { value: part } });
    });
  });

  // Submit the form
  const submitButton = getByRole("button", { name: /solve/i });
  fireEvent.click(submitButton);

  // Wait for results to be displayed
  await waitFor(() => getByText(/results/i));

  // Check that results are displayed correctly
  const resultsContainer = getByRole("results-container");
  assert(resultsContainer, "Results container should be in the document");
  assertEquals(resultsContainer?.textContent?.includes("pre"), true);
  assertEquals(resultsContainer?.textContent?.includes("post"), true);
  assertEquals(resultsContainer?.textContent?.includes("un"), true);
  assertEquals(resultsContainer?.textContent?.includes("re"), true);
});
