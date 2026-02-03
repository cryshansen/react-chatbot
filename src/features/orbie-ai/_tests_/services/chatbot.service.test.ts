import { describe, it, expect, vi } from "vitest";
import { createChatbotService } from "../../services/chatbot.service";
import * as request from "../../api/requestPublic";

describe("createChatbotService", () => {
  it("calls requestPublic with encoded category", async () => {
    const spy = vi
      .spyOn(request, "requestPublic")
      .mockResolvedValue({ fortune: "Test fortune" });

    const service = createChatbotService("https://api.test/chat");

    const result = await service.chatbotMessageApi("future & luck");

    expect(spy).toHaveBeenCalledWith(
      "https://api.test/chat?category=future%20%26%20luck"
    );
    expect(result.fortune).toBe("Test fortune");
  });

  it("propagates API errors", async () => {
    vi.spyOn(request, "requestPublic").mockRejectedValue(
      new Error("Network error")
    );

    const service = createChatbotService("https://api.test/chat");

    await expect(
      service.chatbotMessageApi("fail")
    ).rejects.toThrow("Network error");
  });
});
