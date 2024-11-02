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

  forEach(callback: (value: string, key: string) => void) {
    for (const [key, value] of this.data.entries()) {
      callback(value, key);
    }
  }
} as unknown as typeof FormData;

describe("QuartileSolver end-to-end tests", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should display results correctly after form submission", async () => {
    // Mock the fetch function to return a successful response
    globalThis.fetch = () => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            results: [
              {
                word: "prepost",
                parts: [{ part: "pre", order: 1 }, { part: "post", order: 2 }],
              },
              {
                word: "unre",
                parts: [{ part: "un", order: 1 }, { part: "re", order: 2 }],
              },
            ],
            error: "",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    };

    const { getByText, getByRole, container } = render(<QuartileSolver />);

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
        const input = container.querySelector(
          `input[name="input-${rowIndex}-${colIndex}"]`,
        );
        if (input) {
          fireEvent.input(input, { target: { value: part } });
        } else {
          throw new Error(`Input not found: input-${rowIndex}-${colIndex}`);
        }
      });
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
