import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assert, assertEquals } from "$std/assert/mod.ts";
import { fireEvent, waitFor } from "@testing-library/preact";
import QuartileSolver from "../../islands/QuartileSolver.tsx";

// Mock FormData
globalThis.FormData = class {
  private data: Map<string, string> = new Map();

  append(key: string, value: string) {
    this.data.set(key, value);
  }

  entries() {
    return this.data.entries();
  }
} as any;

describe("QuartileSolver integration tests", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should display results correctly after form submission", async () => {
    // Mock the fetch function to return a successful response
    globalThis.fetch = async () => {
      return new Response(
        JSON.stringify({
          results: [
            {
              word: "part0part1",
              parts: [{ part: "part0", order: 1 }, { part: "part1", order: 2 }],
            },
            {
              word: "part2part3",
              parts: [{ part: "part2", order: 1 }, { part: "part3", order: 2 }],
            },
          ],
          error: "",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const { getByText, getByRole, container } = render(<QuartileSolver />);

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

    const resultDivs = resultsContainer?.querySelectorAll("div.p-2");
    assert(
      resultDivs && resultDivs.length > 0,
      "Result divs should be present",
    );

    resultDivs?.forEach((resultDiv) => {
      const spans = resultDiv.querySelectorAll("span span");
      assertEquals(spans.length > 0, true);
    });
  });
});
