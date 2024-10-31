import { h } from "preact";
import { render, fireEvent, waitFor } from "@testing-library/preact";
import QuartileSolver from "../../islands/QuartileSolver.tsx";

Deno.test("QuartileSolver integration test", async () => {
  const { getByText, getByRole, getByLabelText, container } = render(<QuartileSolver />);

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
  const paragraphs = resultsContainer.querySelectorAll("p");
  assertEquals(paragraphs.length > 0, true);
  paragraphs.forEach((paragraph) => {
    const spans = paragraph.querySelectorAll("span");
    assertEquals(spans.length > 0, true);
  });
});
