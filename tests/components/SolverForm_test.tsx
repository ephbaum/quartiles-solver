import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/assert/mod.ts";
import { fireEvent } from "@testing-library/preact";
import SolverForm from "../../components/SolverForm.tsx";

describe("SolverForm component tests", () => {
  let timerId: number;

  beforeAll(() => {
    setup();
    globalThis.FormData = class {
      private data: Record<string, string> = {};
      append(key: string, value: string) {
        this.data[key] = value;
      }
      entries() {
        return Object.entries(this.data);
      }
    } as any;
  });

  afterEach(() => {
    cleanup();
    clearTimeout(timerId);
  });

  it("should handle form submission correctly", async () => {
    const mockOnSubmit = async (jsonData: any) => {
      return new Promise<void>((resolve) => {
        timerId = setTimeout(() => {
          resolve();
        }, 100);
      });
    };

    const { container, getByText } = render(
      <SolverForm onSubmit={mockOnSubmit} isLoading={false} />,
    );

    const form = container.querySelector("form");
    if (form) {
      await fireEvent.submit(form);
    }

    const button = getByText("Solve") as HTMLButtonElement;
    assertEquals(button.disabled, false);
  });

  it("should display error message correctly", async () => {
    const mockOnSubmit = async () => {
      throw new Error("Test error");
    };

    const { container, findAllByText } = render(
      <SolverForm onSubmit={mockOnSubmit} isLoading={false} />,
    );

    const form = container.querySelector("form");
    if (form) {
      await fireEvent.submit(form);
    }

    const errorMessages = await findAllByText((_content, element) => {
      return element?.textContent?.includes(
        "An error occurred while processing your request.",
      ) || false;
    });

    assertEquals(
      errorMessages.length > 0,
      true,
      "Expected to find at least one error message",
    );
  });
});
