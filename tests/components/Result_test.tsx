import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/assert/mod.ts";
import { expect } from "$fresh-testing-library/expect.ts";
import Result from "../../components/Result.tsx";
import { WordResult } from "../../types.ts";

const mockResult: WordResult = {
  word: "baked",
  parts: [
    { part: "bak", order: 1 },
    { part: "ed", order: 2 },
  ],
};

describe("Result component tests", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should render word parts correctly", () => {
    const { container } = render(<Result result={mockResult} />);
    const spans = container.querySelectorAll("span");
    assertEquals(spans.length, 4);
    assertEquals(spans[0].textContent, "bak");
    assertEquals(spans[2].textContent, "ed");
  });

  it("should render no parts when parts array is empty", () => {
    const emptyResult: WordResult = { word: "empty", parts: [] };
    const { container } = render(<Result result={emptyResult} />);
    const spans = container.querySelectorAll("span");
    assertEquals(spans.length, 0);
  });

  it("should render parts in correct order", () => {
    const unorderedResult: WordResult = {
      word: "unordered",
      parts: [
        { part: "der", order: 3 },
        { part: "un", order: 1 },
        { part: "or", order: 2 },
        { part: "ed", order: 4 },
      ],
    };
    const { container } = render(<Result result={unorderedResult} />);
    const spans = container.querySelectorAll("span");
    assertEquals(spans.length, 8);
    assertEquals(spans[0].textContent, "un");
    assertEquals(spans[2].textContent, "or");
    assertEquals(spans[4].textContent, "der");
    assertEquals(spans[6].textContent, "ed");
  });

  it("should find 'baked' text in document", () => {
    const { queryByText } = render(<Result result={mockResult} />);
    expect(queryByText("bak")).toBeInTheDocument();
    expect(queryByText("ed")).toBeInTheDocument();
    expect(queryByText("foobar")).not.toBeInTheDocument();
  });
});
