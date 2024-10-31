import { h } from "preact";
import { fireEvent, render } from "@testing-library/preact";
import SolverForm from "../../components/SolverForm.tsx";

Deno.test("SolverForm component handles form submission correctly", async () => {
  const mockOnSubmit = async (jsonData: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  const { container, getByText } = render(
    <SolverForm onSubmit={mockOnSubmit} isLoading={false} />,
  );

  const form = container.querySelector("form");
  if (form) {
    fireEvent.submit(form);
  }

  const button = getByText("Solve");
  assertEquals(button.disabled, false);
});

Deno.test("SolverForm component displays error message correctly", async () => {
  const mockOnSubmit = async () => {
    throw new Error("Test error");
  };

  const { container, getByText } = render(
    <SolverForm onSubmit={mockOnSubmit} isLoading={false} />,
  );

  const form = container.querySelector("form");
  if (form) {
    fireEvent.submit(form);
  }

  const errorMessage = await getByText(
    "An error occurred while processing your request.",
  );
  assertEquals(
    errorMessage.textContent,
    "An error occurred while processing your request.",
  );
});
