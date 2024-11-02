import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/assert/mod.ts";
import WordPart from "../../components/WordPart.tsx";
import { WordPart as WordPartType } from "../../types.ts";

const mockWordPart: WordPartType = {
  part: "bak",
  order: 1,
};

describe("WordPart component tests", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("should render the word part correctly", () => {
    const { container } = render(<WordPart part={mockWordPart} />);
    const span = container.querySelector("span");
    assertEquals(span?.textContent, "bak");
  });
});
