import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { OrbieWidget } from "../components/OrbieWidget";
import { createChatbotService } from "../services/chatbot.service";
import type { MockedFunction } from "vitest";
import { renderOrbieWidget } from "./test-utils/renderOrbieWidget";

vi.mock("../services/chatbot.service", () => ({
  createChatbotService: vi.fn(),
}));

const mockChatbotMessageApi = vi.fn();

const baseConfig = {
  apiUrl: "http://test-api",
  endpoint: "/chat",
};

beforeEach(() => {
  vi.clearAllMocks();
  
  const mockedCreateChatbotService = createChatbotService as MockedFunction<typeof createChatbotService>;

  mockedCreateChatbotService.mockReturnValue({
    chatbotMessageApi: mockChatbotMessageApi,
  });
});


describe("ChatbotContext", () => {
  it("loads the test suite", () => {
    expect(true).toBe(true);
  });
});
describe("OrbieWidget (drop-in integration)", () => {
  it("renders widget with initial system message", () => {
    render(
      <OrbieWidget
        config={baseConfig}
        chatbotName="Oracle"
        theme="dark"
        initialPrompt="Ask me about your future 🔮"
      />
    );

    expect(
      screen.getByText("Ask me about your future 🔮")
    ).toBeInTheDocument();
  });

  it("applies dark theme", () => {
    render(
      <OrbieWidget
        config={baseConfig}
        chatbotName="Oracle"
        theme="dark"
        initialPrompt="Hello"
      />
    );

    const root = document.querySelector("[data-orbie-root]");
    expect(root).toHaveAttribute("data-theme", "dark");
  });

  it("maintains isolated state across multiple widgets", () => {
    render(
      <>
        <OrbieWidget
          config={baseConfig}
          chatbotName="Oracle"
          initialPrompt="Widget One"
        />
        <OrbieWidget
          config={baseConfig}
          chatbotName="Oracle"
          initialPrompt="Widget Two"
        />
      </>
    );

    expect(screen.getByText("Widget One")).toBeInTheDocument();
    expect(screen.getByText("Widget Two")).toBeInTheDocument();
  });


  it("displays bot response after sending message", async () => {
    mockChatbotMessageApi.mockResolvedValueOnce({
      fortune: "Great things are coming",
    });

    render(
      <OrbieWidget
        config={baseConfig}
        chatbotName="Oracle"
        initialPrompt="Hello"
      />
    );

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole("button", { name: /send/i });
    //Alternatively use const button = screen.getByTestId("send");

    await act(async () => {
      fireEvent.change(input, { target: { value: "My future?" } });
      fireEvent.click(button);
    });

    expect(
      await screen.findByText("Great things are coming")
    ).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    mockChatbotMessageApi.mockRejectedValueOnce(
      new Error("API failed")
    );


    renderOrbieWidget({
        chatbotName: "Oracle",
        initialPrompt: "Hello",
      });

    

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole("button", { name: /send/i });
    //Alternatively use const button = screen.getByTestId("send");


    await act(async () => {
      fireEvent.change(input, { target: { value: "Fail test" } });
      fireEvent.click(button);
    });

    expect(
      await screen.findByText("Sorry, something went wrong.")
    ).toBeInTheDocument();
  });
});
