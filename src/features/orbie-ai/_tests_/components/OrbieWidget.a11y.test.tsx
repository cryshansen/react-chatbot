import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderOrbieWidget } from "../test-utils/renderOrbieWidget";

describe("OrbieWidget accessibility", () => {
  it("has an accessible send button", () => {
    renderOrbieWidget();

    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeInTheDocument();
  });

  it("renders initial system message", () => {
    renderOrbieWidget({
      initialPrompt: "Hello from Oracle",
    });

    expect(
      screen.getByText("Hello from Oracle")
    ).toBeInTheDocument();
  });

  it("input is focusable", () => {
    renderOrbieWidget();

    const input = screen.getByPlaceholderText(/type your message/i);
    input.focus();

    expect(input).toHaveFocus();
  });
});
